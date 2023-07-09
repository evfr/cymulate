"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const PostController_1 = __importDefault(require("./controllers/PostController"));
const FriendController_1 = __importDefault(require("./controllers/FriendController"));
const DbService_1 = __importDefault(require("./services/DbService"));
class Server {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.configureMiddleware();
        this.configureRoutes();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    configureRoutes() {
        const userController = new UserController_1.default();
        const postController = new PostController_1.default();
        const friendController = new FriendController_1.default();
        this.app.post('/signup', userController.signUp);
        this.app.post('/login', userController.login);
        this.app.get('/users', userController.authenticate, userController.getAllUsers);
        this.app.get('/users/:id', userController.authenticate, userController.getUserById);
        this.app.get('/posts', userController.authenticate, postController.getAllUserPosts);
        this.app.get('/posts/friends', userController.authenticate, postController.getUserFriendsPosts);
        this.app.post('/posts', userController.authenticate, postController.addPost);
        this.app.put('/posts/:id', userController.authenticate, postController.updatePost);
        this.app.delete('/posts/:id', userController.authenticate, postController.deletePost);
        // this.app.post('/comments', userController.authenticate, commentsController.addComment);
        this.app.post('/friends/request', userController.authenticate, friendController.sendFriendRequest);
        this.app.post('/friends/accept', userController.authenticate, friendController.acceptFriendRequest);
        this.app.post('/friends/reject', userController.authenticate, friendController.rejectFriendRequest);
        this.app.get('/friends', userController.authenticate, friendController.getUserFriends);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            DbService_1.default.getDb();
            this.app.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        });
    }
}
const port = 3000;
const server = new Server(port);
server.start();
//# sourceMappingURL=server.js.map