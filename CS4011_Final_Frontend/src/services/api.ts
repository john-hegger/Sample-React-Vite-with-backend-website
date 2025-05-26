import axios from 'axios';
import { type BlogPost } from '../types/index';

const BASE_URL = 'http://localhost:3000/posts';

export const fetchPosts = async (): Promise<BlogPost[]> => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const createPost = async (data: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    const res = await axios.post(BASE_URL, data);
    return res.data;
};

export const updatePost = async (id: string, data: { title: string; author: string; content: string }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
};



export const deletePost = async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
};
