import { Repository } from "typeorm";
import { MovieController } from "../movie.controller";
import { MoviesService } from "../movie.service";
import { Movie } from "../movie.entity";
import { Test } from "@nestjs/testing";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('MovieController', () => {
    let movieController: MovieController;
    let movieService: MoviesService;
    let movieRepository: Repository<Movie>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
          controllers: [MovieController],
          providers: [
            MoviesService,
                {
                    provide: 'MovieRepository',
                    useValue: {
                        find: jest.fn(),
                    },
                },
          ],
        }).compile();
    
        movieService = moduleRef.get<MoviesService>(MoviesService);
        movieRepository = moduleRef.get<Repository<Movie>>('MovieRepository');
        movieController = new MovieController(movieService);
      });

    describe('findAll', () => {
        it('should return an array of movies', async () => {
          const result: Movie[] = [ 
            {
              id: 1,
              title: 'Movie 1',
              description: 'Description 1',
              director: {
                  id: 1,
                  firstName: 'Director 1',
                  lastName: 'Director 1',
                  movies: []
              },
            },
            {
              id: 2,
              title: 'Movie 2',  
              description: 'Description 2',
              director: {
                  id: 1,
                  firstName: "Director 1",
                  lastName: "Director 1",
                  movies: []
              }
            }
          ];
          jest.spyOn(movieRepository, 'find').mockImplementation(async () => result);
          expect(await movieController.findAll()).toBe(result);
        });

        it('should throw NotFoundException if movies are not found', async () => {
          jest.spyOn(movieRepository, 'find').mockImplementation(async () => []);
          await expect(movieController.findAll()).rejects.toThrow(NotFoundException);
        });
    });

    describe('create', () => {
        it('should create a new movie', async () => {
          const result: Movie = new Movie();
          jest.spyOn(movieService, 'create').mockImplementation(async () => result);
          expect(await movieController.create(new Movie())).toBe(result);
        });
        it('should throw BadRequestException if movie is not created', async () => {
          jest.spyOn(movieService, 'create').mockRejectedValue(new BadRequestException('Error creating movie'));
          await expect(movieController.create(new Movie())).rejects.toThrow(BadRequestException);
        });
        it('should throw BadRequestException if movie data is invalid', async () => {
          jest.spyOn(movieService, 'create').mockRejectedValue(new BadRequestException('Invalid movie data'));
          await expect(movieController.create(new Movie())).rejects.toThrow(BadRequestException);
        });
    });

    describe('update', () => {
        it('should update a movie', async () => {
          const result: Movie = new Movie();
          jest.spyOn(movieService, 'update').mockImplementation(async () => result);
          expect(await movieController.update(1, new Movie())).toBe(result);
        });
        it('should throw NotFoundException if the movie to update is not found', async () => {
          jest.spyOn(movieService, 'update').mockRejectedValue(new NotFoundException('Movie not found'));
          await expect(movieController.update(1, new Movie())).rejects.toThrow(NotFoundException);
        });
        it('should throw BadRequestException if movie data for update is invalid', async () => {
          jest.spyOn(movieService, 'update').mockRejectedValue(new BadRequestException('Invalid movie data for update'));
          await expect(movieController.update(1, new Movie())).rejects.toThrow(BadRequestException);
        });
    });

    describe('remove', () => {
        it('should remove a movie', async () => {
          const result: void = undefined;
          jest.spyOn(movieService, 'remove').mockImplementation(async () => result);
          expect(await movieController.remove(1)).toBe(result);
        });
        it('should throw NotFoundException if the movie to remove is not found', async () => {
          jest.spyOn(movieService, 'remove').mockRejectedValue(new NotFoundException('Movie not found'));
          await expect(movieController.remove(1)).rejects.toThrow(NotFoundException);
        });
        it('should throw BadRequestException if movie data for remove is invalid', async () => {
          jest.spyOn(movieService, 'remove').mockRejectedValue(new BadRequestException('Invalid movie data for remove'));
          await expect(movieController.remove(1)).rejects.toThrow(BadRequestException);
        });
    });
})