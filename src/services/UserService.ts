import {iUser} from '../types/types';
import DbService from './DbService';
import { Db, Collection, WithId, Document } from 'mongodb';

class UserService {
    private db: Db | undefined;
  
    public async getAllUsers(): Promise<iUser[]> {
      this.db = await DbService.getDb();
      const dbUsers: WithId<Document>[] = await this.db.collection("users").find({}).toArray();

      const transformedUsers: iUser[] = dbUsers.map(dbUser => ({
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        pass: ''
      }));

      return transformedUsers;
    }
  
    public async getUserById(userId: number): Promise<iUser | null> {
      this.db = await DbService.getDb();
      const dbUser: WithId<Document> | null = await this.db.collection("users").findOne({id: userId }) as WithId<Document>;
      if (dbUser) {
        const user: iUser = {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          pass: ''
        }
        return user;
      }
      return null;
    }

    public async getUserByNameAndPass(name: string, pass: string): Promise<iUser | null> {
      this.db = await DbService.getDb();
      const dbUser: WithId<Document> | null = await this.db.collection("users").findOne({name, pass}) as WithId<Document>;
      if (dbUser) {
        const user: iUser = {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          pass: ''
        }
        return user;
      }
      return null;
    }
  
    public async createUser(name: string, pass: string, email: string): Promise<iUser | null> {
      const random: number = Math.floor(Math.random() * 10000) + 1;
      this.db = await DbService.getDb();
      const newUser: iUser = { id: random, name, pass, email };
      await this.db.collection("users").insertOne(newUser);
      return newUser;
    }
  }
  
  export default UserService;