import {Comment} from './Comment';

export interface Recipe {
  recipeId?: number;
  recipeName: string;
  description: string;
  image?: File;
  likes?: number;
  usersLiked?: string[];
  comments?: Comment [];
  username?: string;
}
