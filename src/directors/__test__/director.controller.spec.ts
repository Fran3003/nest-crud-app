import { Repository } from "typeorm";
import { DirectorController } from "../director.controller";
import { DirectorService } from "../director.service";
import { Director } from "../director.entity";
import { Test } from "@nestjs/testing";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('DirectorController', () => {
    let directorController: DirectorController;
    let directorService: DirectorService;
    let directorRepository: Repository<Director>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
          controllers: [DirectorController],
          providers: [
            DirectorService,
                {
                    provide: 'DirectorRepository',
                    useValue: {
                        find: jest.fn(),
                    },
                },
          ],
        }).compile();
    
        directorService = moduleRef.get<DirectorService>(DirectorService);
        directorRepository = moduleRef.get<Repository<Director>>('DirectorRepository');
        directorController = new DirectorController(directorService);
      });

      describe('findAll', () => {
        it('should return an array of directors', async () => {
          const result: Director[] = [
          {
            id: 1,
            firstName: 'Nombre 1',
            lastName: 'Apellido 1',
            movies: [],
          },
          {
            id: 2,
            firstName: 'Nombre 2',
            lastName: 'Apellido 2',
            movies: [],
          }
          ];
          jest.spyOn(directorRepository, 'find').mockImplementation(async () => result);
          expect(await directorController.findAll()).toBe(result);
        });

        it('should throw NotFoundException if directors are not found', async () => {
          jest.spyOn(directorRepository, 'find').mockImplementation(async () => []);
          await expect(directorController.findAll()).rejects.toThrow(NotFoundException);
        });
      });

      describe('create', () => {
        it('should create a new director', async () => {
          const result: Director = new Director();
          jest.spyOn(directorService, 'create').mockImplementation(async () => result);
          expect(await directorController.create(new Director())).toBe(result);
        });
        it('should throw BadRequestException if director is not created', async () => {
            jest.spyOn(directorService, 'create').mockRejectedValue(new BadRequestException('Error creating director'));
            await expect(directorController.create(new Director())).rejects.toThrow(BadRequestException);
        });
        it('should throw BadRequestException if director data is invalid', async () => {
            jest.spyOn(directorService, 'create').mockRejectedValue(new BadRequestException('Invalid director data'));
            await expect(directorController.create(new Director())).rejects.toThrow(BadRequestException);
        });
      });

      describe('update', () => {
        it('should update a director', async () => {
          const result: Director = new Director();
          jest.spyOn(directorService, 'update').mockImplementation(async () => result);
          expect(await directorController.update(1, new Director())).toBe(result);
        });
        it('should throw NotFoundException if the director to update is not found', async () => {
          jest.spyOn(directorService, 'update').mockRejectedValue(new NotFoundException('Director not found'));
          await expect(directorController.update(1, new Director())).rejects.toThrow(NotFoundException);
        });
        it('should throw BadRequestException if director data for update is invalid', async () => {
          jest.spyOn(directorService, 'update').mockRejectedValue(new BadRequestException('Invalid director data for update'));
          await expect(directorController.update(1, new Director())).rejects.toThrow(BadRequestException);
        });
      });

      describe('remove', () => {
        it('should remove a director', async () => {
          const result: void = undefined;
          jest.spyOn(directorService, 'remove').mockImplementation(async () => result);
          expect(await directorController.remove(1)).toBe(result);
        });
        it('should throw NotFoundException if the director to remove is not found', async () => {
          jest.spyOn(directorService, 'remove').mockRejectedValue(new NotFoundException('Director not found'));
          await expect(directorController.remove(1)).rejects.toThrow(NotFoundException);
        });
        it('should throw an error if an unexpected error occurs', async () => {
          jest.spyOn(directorService, 'remove').mockRejectedValue(new Error('Unexpected error'));
          await expect(directorController.remove(1)).rejects.toThrow();
        });
      });
})