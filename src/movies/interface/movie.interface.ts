import { Movie } from "../movie.entity";
import { MovieDto } from "../dto/movie.dto";

export interface MovieInterface {
    findAll(): Promise<Movie[]>;
    create(MovieDto: MovieDto): Promise<Movie>;
    update(id: number, MovieDto: MovieDto): Promise<Movie>;
    remove(id: number): Promise<void>;
}