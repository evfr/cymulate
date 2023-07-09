import {iPost} from '../types/types';
import DbService from './DbService';
import { Db, Collection, WithId, Document } from 'mongodb';

class PostService {
    private db: Db | undefined;
  
    public async getAllUserPosts(userId: number): Promise<iPost[]> {
      this.db = await DbService.getDb();
      const dbPosts: WithId<Document>[] = await this.db.collection("posts").find({userId}).toArray();

      const transformedPosts: iPost[] = dbPosts.map(dbPost => ({
        id: dbPost.id,
        userId: dbPost.id,
        text: dbPost.text,
        date: dbPost.date
      }));

      return transformedPosts;
    }
  
    public async getUserFriendsPosts(userId: number): Promise<iPost[]> {
      this.db = await DbService.getDb();

      const friendsIds:WithId<Document>[] = await this.db.collection("users").find({id: userId}, { projection: { friends: 1 } }).toArray();
      if (!friendsIds || !friendsIds.length) {
        return [];
      }

      const dbPosts: WithId<Document>[] = await this.db.collection("posts").find({userId:{ $in: friendsIds[0].friends }}).toArray();

      const transformedPosts: iPost[] = dbPosts.map(dbPost => ({
        id: dbPost.id,
        userId: dbPost.userId,
        text: dbPost.text,
        date: dbPost.date
      }));

      return transformedPosts;
    }

    public async addPost(post: iPost): Promise<iPost | null> {
      this.db = await DbService.getDb();
      await this.db.collection("posts").insertOne(post);
      return post;
    }

    public async updatePost(post: iPost): Promise<iPost | null> {
      this.db = await DbService.getDb();

      await this.db.collection("posts").updateOne({id: post.id, userId: post.userId}, { $set: { text: post.text, date: post.date }});
      return post;
    }

    public async deletePost(postId: number): Promise<void> {
      this.db = await DbService.getDb();
      await this.db.collection("posts").deleteOne({id: postId});

      return
    }
  }
  
  export default PostService;