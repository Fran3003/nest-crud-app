import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class MovieDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    title: string;

    @IsString()
    @MinLength(2)
    @MaxLength(500)
    description: string;
}