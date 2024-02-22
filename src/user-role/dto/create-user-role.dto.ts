import { IsString } from "class-validator";

export class CreateUserRoleDto {
    @IsString()
    title: string
}
