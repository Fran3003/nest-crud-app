import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class DirectorDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    lastName: string;
}