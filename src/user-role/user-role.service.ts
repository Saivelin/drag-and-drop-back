import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { DefaultServices } from 'src/defaultServices/DefaultServices';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserRoleService extends DefaultServices{
    constructor(public prisma: PrismaService) {
        super({prisma: prisma.userRole, name: "userRole"})
    }
}
