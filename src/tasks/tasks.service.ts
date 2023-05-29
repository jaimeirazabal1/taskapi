import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskmodel: Model<Task>) { }

    async findAll() {
        return await this.taskmodel.find();
    }

    async create(createTask: CreateTaskDto) {
        return await this.taskmodel.create(createTask);
    }

    async findOne(id: string) {
        return await this.taskmodel.findById(id);
    }

    async delete(id: string) {
        return this.taskmodel.findByIdAndDelete(id);
    }

    async update(id: string, task: UpdateTaskDto) {
        return await this.taskmodel.findByIdAndUpdate(id, task);
    }
}
