import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    name: string
    @IsNotEmpty()
    password: string
    @IsNumber()
    role: number
}
