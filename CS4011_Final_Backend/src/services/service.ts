import { PostModel } from '../model/schema/PostSchema';

export const getAllPosts = async () => {
  return PostModel.find().sort({ createdAt: -1 });
};

export const createPost = async (data: { title: string; author: string; content: string; }) => {
  return PostModel.create(data);
};

export const updatePost = async (id: string, data: { title: string; author: string; content: string }) => {
    return PostModel.findOneAndUpdate({ id } , data, { new: true });
}

export const deletePost = async (id: string) => {
    return PostModel.findOneAndDelete({ id })
}
