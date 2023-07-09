import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UserController from './controllers/UserController';
import PostController from './controllers/PostController';
import FriendController from './controllers/FriendController';
import DbService from './services/DbService';

class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private configureRoutes(): void {
    const userController = new UserController();
    const postController = new PostController();
    const friendController = new FriendController();

    this.app.post('/signup', userController.signUp);
    this.app.post('/login', userController.login);

    this.app.get('/users', userController.authenticate, userController.getAllUsers);
    this.app.get('/users/:id',userController.authenticate, userController.getUserById);

    this.app.get('/posts', userController.authenticate, postController.getAllUserPosts);
    this.app.get('/posts/friends', userController.authenticate, postController.getUserFriendsPosts);
    this.app.post('/posts', userController.authenticate, postController.addPost);
    this.app.put('/posts/:id',userController.authenticate, postController.updatePost);
    this.app.delete('/posts/:id',userController.authenticate, postController.deletePost);

    // this.app.post('/comments', userController.authenticate, commentsController.addComment);

    this.app.post('/friends/request', userController.authenticate, friendController.sendFriendRequest);
    this.app.post('/friends/accept', userController.authenticate, friendController.acceptFriendRequest);
    this.app.post('/friends/reject', userController.authenticate, friendController.rejectFriendRequest);
    this.app.get('/friends', userController.authenticate, friendController.getUserFriends);
  }

  public async start(): Promise<void> {
    DbService.getDb();
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const port = 3000;
const server = new Server(port);
server.start();
