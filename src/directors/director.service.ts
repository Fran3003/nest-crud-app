import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Director } from "./director.entity";
import { DirectorDto } from "./dto/director.dto";
import { DirectorInterface } from "./interface/director.interface";

@Injectable()
export class DirectorService implements DirectorInterface {
    constructor(
        @InjectRepository(Director)
        private directorRepository: Repository<Director>,
    ) {}

    async findAll(): Promise<Director[]> {
        const directors = await this.directorRepository.find();
        if (!directors || directors.length === 0) {
            throw new NotFoundException('Directors not found');
        }
        return directors;
    }

    async create(DirectorDto: DirectorDto): Promise<Director> {
        const newDirector = this.directorRepository.create(DirectorDto);
        try {
            return this.directorRepository.save(newDirector);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('internal server error');
        }
    }

    async update(id: number, DirectorDto: DirectorDto): Promise<Director> {
        const director = await this.directorRepository.findOne({ where: { id } });
        if (!director) {
            throw new NotFoundException('Director not found');
        }
        await this.directorRepository.update(id, DirectorDto);
        return this.directorRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        const director = await this.directorRepository.findOne({ where: { id } });
        if (!director) {
            throw new NotFoundException('Director not found');
        }
        await this.directorRepository.delete(id);
    }
}