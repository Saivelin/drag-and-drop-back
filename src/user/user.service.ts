import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DefaultServices } from 'src/defaultServices/DefaultServices';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService extends DefaultServices{
    constructor(public prisma: PrismaService) {
        super({prisma: prisma.user, name: "user"})
    }

    async add(createUserDto: CreateUserDto){
        return this.prisma.user.create({
            data: {
                name: createUserDto.name,
                password: createUserDto.password,
                roleId: createUserDto.role,
            }
        })
    }

    async findAll(){
        return this.prisma.user.findMany({include: {role: true}})
    }
}