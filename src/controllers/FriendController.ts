import { Request, Response } from 'express';
import FriendService from '../services/FriendService';
import { iPost, iUser } from '../types/types';

class PostController {
  private friendService: FriendService;

  constructor() {
    this.friendService = new FriendService();
  }

  public getUserFriends = async (req: Request, res: Response): Promise<void> => {
    const user: iUser = (req as any).user.user;

    const friends = await this.friendService.getUserFriends(user.id);
    res.json(friends);
  };

  public sendFriendRequest = async (req: Request, res: Response): Promise<void> => {
    const user: iUser = (req as any).user.user;
    const { friendId } = req.body;
    if (!friendId) {
      res.status(400).json({ message: 'Bad request. missing field "friendId"' });
    }
    const result: boolean = await this.friendService.sendFriendRequest(friendId, user.id);
    res.json({sent: result});
  };

  public acceptFriendRequest = async (req: Request, res: Response) : Promise<void> => {
    const user: iUser = (req as any).user.user;
    const { friendId } = req.body;

    if (!friendId) {
      res.status(400).json({ message: 'Bad request. missing field "friendId"' });
    }

    const result: boolean = await this.friendService.acceptFriendRequest(friendId, user.id);
    res.json({accepted: result});
  };

  public rejectFriendRequest = async (req: Request, res: Response) : Promise<void> => {
    const user: iUser = (req as any).user.user;
    const { friendId } = req.body;

    if (!friendId) {
      res.status(400).json({ message: 'Bad request. missing field "friendId"' });
    }

    const result: boolean = await this.friendService.rejectFriendRequest(friendId, user.id);
    res.json({rejected: result});
  };
}

export default PostController;