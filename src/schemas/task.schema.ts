
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
    timestamps: true
})
export class Task {

    @Prop({
        unique: true,
        required: true,
        trim: true
    })
    title: string;

    @Prop({
        trim: true
    })
    descripcion: string;

    @Prop({
        default: false
    })
    done: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);