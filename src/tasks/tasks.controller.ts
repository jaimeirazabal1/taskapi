import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    @Get()
    findAll() {
        return this.tasksService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const task = await this.tasksService.findOne(id);
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }
    @Post()
    async create(@Body() body: CreateTaskDto) {
        try {
            return await this.tasksService.create(body);
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Task already exists!');
            }
            throw error;
        }
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
        const task = await this.tasksService.findOne(id);
        if (!task) throw new NotFoundException('Task not found');
        return this.tasksService.update(id, body);
    }
    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        const task = await this.tasksService.findOne(id);
        if (!task) throw new NotFoundException('Task not found');
        return this.tasksService.delete(id);
    }
}
