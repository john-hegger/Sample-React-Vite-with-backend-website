import { Request, Response, NextFunction } from 'express';
import { getAllPosts, createPost, updatePost, deletePost } from '../services/service';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const addPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, content } = req.body;
    const post = await createPost({ title, author, content });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export const editPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;  // get post id from URL
        const { title, author, content } = req.body;
        const updatedPost = await updatePost( id , { title, author, content });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        next(err);
    }
};
export const removePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deleted = await deletePost( id );
        if (!deleted) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).send(); // 204 No Content for successful delete
    } catch (err) {
        next(err);
    }
};



