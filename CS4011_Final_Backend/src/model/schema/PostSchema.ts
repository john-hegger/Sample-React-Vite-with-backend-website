import { Schema, model } from 'mongoose'


export interface Post {
    id: string
    title: string;
    author: string;
    content: string;
    date?: Date;
    
}

const PostSchema = new Schema(
    
    {
    id: {
        type: String,
        default: () => Date.now().toString(36),
        required: true,
    },
    title: {
        type: String,
        required: true,
        },
    author: {
            type: String,
            required: false,
        },
    content: {
        type: String,
        required: true,
        },
    date: {
        type: Date,
        default: Date.now,
    }
    },
{
    timestamps: true
    }
)




export const PostModel = model('Post', PostSchema)