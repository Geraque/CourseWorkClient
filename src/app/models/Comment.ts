import {User} from './User';

export interface Comment {
  id?: number;
  commentText: string;
  user: User;
}
