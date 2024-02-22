import { IsArray, IsIn, IsNumber, IsOptional, IsString } from "class-validator"
export enum StatusEnum {
    Process="process",
    Completed="completed",
    Created="created"
}

export class CreateTaskDto {
    @IsOptional()
    @IsNumber()
    id?: number
    @IsString()
    title: string
    @IsOptional()
    @IsString()
    description?: string
    @IsNumber()
    creator: number
    @IsOptional()
    @IsArray()
    executors?: number[]
    @IsOptional()
    @IsString()
    deadline?: string
    @IsOptional()
    @IsIn([StatusEnum.Process, StatusEnum.Completed, StatusEnum.Created])
    status?: string
}