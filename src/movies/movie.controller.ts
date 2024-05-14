import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movie.service';
import { Movie } from './movie.entity';
import { MovieDto } from './dto/movie.dto';
import { MovieInterface } from './interface/movie.interface';

@Controller('movies')
export class MovieController implements MovieInterface {
    constructor(private readonly movieService: MoviesService) {}

    @Get()
    async findAll(): Promise<Movie[]> {
        return this.movieService.findAll();
    }

    @Post()
    async create(@Body() MovieDto: MovieDto): Promise<Movie> {
        return this.movieService.create(MovieDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() MovieDto: MovieDto): Promise<Movie> {
        return this.movieService.update(id, MovieDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.movieService.remove(id);
    }
}