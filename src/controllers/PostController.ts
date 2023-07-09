import { Request, Response } from 'express';
import PostService from '../services/PostService';
import { iPost, iUser } from '../types/types';

class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  public getAllUserPosts = async (req: Request, res: Response): Promise<void> => {
    const user: iUser = (req as any).user.user;

    const posts = await this.postService.getAllUserPosts(user.id);
    res.json(posts);
  };

  public getUserFriendsPosts = async (req: Request, res: Response): Promise<void> => {
    const user: iUser = (req as any).user.user;

    const posts = await this.postService.getUserFriendsPosts(user.id);
    res.json(posts);
  };

  public addPost = async (req: Request, res: Response) : Promise<void> => {
    const user: iUser = (req as any).user.user;
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ message: 'Bad request. missing field "text"' });
    }
    const random: number = Math.floor(Math.random() * 10000) + 1;
    const date = new Date();
    const newPost: iPost | null = await this.postService.addPost({ id: random, text, userId: user.id, date });
    res.json(newPost);
  };

  public updatePost = async (req: Request, res: Response): Promise<void> => {
    const user: iUser = (req as any).user.user;
    const postId = parseInt(req.params.id);
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ message: 'Bad request. missing field "text" or "id"' });
    }
    const newPost: iPost | null = await this.postService.updatePost({ id: postId, text, userId: user.id, date: new Date() });
    res.json(newPost);
  };

  public deletePost = async (req: Request, res: Response): Promise<void> => {
    const postId = parseInt(req.params.id);
    await this.postService.deletePost(postId);
    res.json({deleted: true});
  };
}

export default PostController;