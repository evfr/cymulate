import {iPost, iUser} from '../types/types';
import DbService from './DbService';
import { Db, Collection, WithId, Document } from 'mongodb';

class FriendService {
    private db: Db | undefined;
  
    public async getUserFriends(userId: number): Promise<iUser[]> {
      this.db = await DbService.getDb();
      const dbFriends: WithId<Document>[] = await this.db.collection("users").find({userId}).toArray();

      const transformedFriends: iUser[] = dbFriends.map(dbFriend => ({
        id: dbFriend.id,
        name: dbFriend.id,
        email: dbFriend.email,
        pass: ''
      }));

      return transformedFriends;
    }
  
    public async sendFriendRequest(friendId: number, myId: number): Promise<boolean> {
      this.db = await DbService.getDb();
      await this.db.collection("users").updateOne({id: friendId}, { $push: { friendRequests: { $each: [myId] } }});
      return true;
    }

    public async acceptFriendRequest(friendId: number, myId: number): Promise<boolean> {
      this.db = await DbService.getDb();

      await this.db.collection("users").updateOne(
        {id: myId}, { 
        $push: { friends: { $each: [friendId] } },
        $pull: { friendRequests: friendId  },
      });

      return true;
    }

    public async rejectFriendRequest(friendId: number, myId: number): Promise<boolean> {
        this.db = await DbService.getDb();
  
        await this.db.collection("users").updateOne({id: myId}, { $pull: { friendRequests: friendId }});
        return true;
      }

  }
  
  export default FriendService;