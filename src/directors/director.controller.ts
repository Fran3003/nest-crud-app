import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { DirectorService } from "./director.service";
import { Director } from "./director.entity";
import { DirectorDto } from "./dto/director.dto";
import { DirectorInterface } from "./interface/director.interface";

@Controller('directors')
export class DirectorController implements DirectorInterface {
    constructor(private readonly directorService: DirectorService) {}

    @Get()
    async findAll(): Promise<Director[]> {
        return await this.directorService.findAll();
    }

    @Post()
    async create(@Body() DirectorDto: DirectorDto): Promise<Director> {
        return await this.directorService.create(DirectorDto);
    }
    
    @Patch(':id')
    update(@Param('id') id: number, @Body() DirectorDto: DirectorDto): Promise<Director> {
        return this.directorService.update(id, DirectorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.directorService.remove(id);
    }
}