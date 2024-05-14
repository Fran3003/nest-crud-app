import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Director } from "./director.entity";
import { DirectorController } from "./director.controller";
import { DirectorService } from "./director.service";

@Module({
    imports: [TypeOrmModule.forFeature([Director])],
    controllers: [DirectorController],
    providers: [DirectorService],
})
export class DirectorModule {}