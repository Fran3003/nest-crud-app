import { Director } from '../director.entity';
import { DirectorDto } from '../dto/director.dto';

export interface DirectorInterface {
  findAll(): Promise<Director[]>;
  create(DirectorDto: DirectorDto): Promise<Director>;
  update(id: number, DirectorDto: DirectorDto): Promise<Director>;
  remove(id: number): Promise<void>;
}