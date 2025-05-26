import { Router } from 'express';
import { getPosts, addPost, editPost, removePost } from '../controllers/postController';

export const routes = Router();

routes.get('/', getPosts);
routes.post('/', addPost);
routes.put('/:id', editPost);
routes.delete('/:id', removePost);

