import { Attachments } from './attachment.interface';
import { User } from './user.interface';
export interface Post {
  id: number;
  type: number;
  title: string;
  description: string;
  isAnonymous: boolean;
  deletedAt?: any;
  createdAt: any;
  votes: number;
  attachments: any[];
  userVoteValue: number;
  user: User;
}
