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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = __importDefault(require("../services/UserService"));
const MY_SECRET = 'mySecret';
class UserController {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, pass, email } = req.body;
            if (!name || !pass || !email) {
                res.status(400).json({ message: 'Bad request. missing field' });
            }
            const newUser = yield this.userService.createUser(name, pass, email);
            res.json(newUser);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, pass } = req.body;
            if (!name || !pass) {
                res.status(400).json({ message: 'Bad request. missing field' });
            }
            const user = yield this.userService.getUserByNameAndPass(name, pass);
            if (!user) {
                res.status(400).json({ message: 'Authentication failed. User not found.' });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ user }, MY_SECRET, { expiresIn: '1d' });
                res.json({ token });
            }
        });
        this.authenticate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                jsonwebtoken_1.default.verify(token, MY_SECRET, (err, user) => {
                    if (err) {
                        return res.sendStatus(403);
                    }
                    req.user = user;
                    next();
                });
            }
            else {
                res.sendStatus(401);
            }
        });
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getAllUsers();
            res.json(users);
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            const user = yield this.userService.getUserById(userId);
            if (!user)
                throw new Error('user not found');
            res.json(user);
        });
        this.userService = new UserService_1.default();
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map