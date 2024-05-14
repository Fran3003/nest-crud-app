import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { MovieDto } from './dto/movie.dto';
import { MovieInterface } from './interface/movie.interface';

@Injectable()
export class MoviesService implements MovieInterface {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    const movies = await this.movieRepository.find();
    if (!movies || movies.length === 0) {
        throw new NotFoundException('Movies not found');
    }
    return movies;
  }

  async create(MovieDto: MovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(MovieDto);
    try {
      return this.movieRepository.save(movie);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('internal server error');
    }
  }

  async update(id: number, MovieDto: MovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    await this.movieRepository.update(id, MovieDto);
    return this.movieRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    await this.movieRepository.delete(id);
  }
}