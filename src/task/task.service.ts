import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DefaultServices } from 'src/defaultServices/DefaultServices';
import { PrismaService } from 'src/prisma.service';

const includeAll = {executors: {include: {role: true}}, creator: {include: {role: true}}}

export enum StatusEnum {
    Process="process",
    Completed="completed",
    Created="created"
}

@Injectable()
export class TaskService extends DefaultServices {
    constructor(public prisma: PrismaService) {
        super({prisma: prisma.task, name: "task"})
    }

    async add(createTaskDto: CreateTaskDto){
        let executors = []
        if (createTaskDto?.executors && createTaskDto?.executors?.length > 0) {
            executors = [...createTaskDto?.executors?.map((el)=>{return {id: el}})]
        }

        return this.prisma.task.create({data: {
            title: createTaskDto.title,
            description: createTaskDto.description || "",
            creatorId: createTaskDto.creator,
            executors: {connect: executors}, 
            deadline: createTaskDto.deadline || "",
            status: createTaskDto.status
        }, include: includeAll})
    }

    async update(id: number, createTaskDto: CreateTaskDto){
        if(createTaskDto.id){
            delete(createTaskDto.id)
        }
        let executors = []
        if (createTaskDto?.executors && createTaskDto?.executors?.length > 0) {
            executors = [...createTaskDto?.executors?.map((el)=>{return {id: el}})]
        }

        return this.prisma.task.update({data: {
            title: createTaskDto.title,
            description: createTaskDto.description || "",
            creatorId: createTaskDto.creator,
            executors: {set: executors}, 
            deadline: createTaskDto.deadline || "",
            status: createTaskDto.status
        }, include: includeAll, where: {id: id}})
    }


    async findAll(){
        return this.prisma.task.findMany({include: includeAll})
    }
}
