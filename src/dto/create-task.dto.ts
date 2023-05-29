import { IsString, IsOptional, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    done?: boolean;
}