import {Comment} from './Comment';
import {Category} from './Category';
import {RecipeNutrition} from './RecipeNutrition';

export interface Recipe {
  recipeId?: number;
  recipeName: string;
  description: string;
  image?: File;
  likes?: number;
  usersLiked?: string[];
  comments?: Comment [];
  username?: string;
  recipeNutrition?: RecipeNutrition;
  categoryIds?: number[];
}
