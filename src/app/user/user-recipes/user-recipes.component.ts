import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {Category} from '../../models/Category';
import {User} from '../../models/User';
import {NotificationService} from '../../service/notification.service';
import {UserService} from '../../service/user.service';
import {RecipeService} from '../../service/recipe.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {CommentService} from '../../service/comment.service';
import {SaveRecipeService} from '../../service/save-recipe.service';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {

  isCategoriesLoaded = false;
  isUserRecipesLoaded = false;
  recipes: Recipe[];
  user: User;
  username: string;
  isSaved: {[key: number]: boolean} = {};
  categoryNames: {[key: number]: string} = {};
  showNutritionPanel: {[key: number]: boolean} = {};

constructor(private userService: UserService,
            private recipeService: RecipeService,
            private imageService: ImageUploadService,
            private commentService: CommentService,
            private notificationService: NotificationService,
            private saveRecipeService: SaveRecipeService,
            private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.recipeService.getRecipeForCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.recipes = data;
        this.getImagesToRecipes(this.recipes);
        this.getCommentsToRecipes(this.recipes);
        this.getCategoriesToRecipes(this.recipes);
        this.isUserRecipesLoaded = true;
      });

    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      categories.forEach((category) => {
        this.categoryNames[category.categoryId] = category.categoryName;
        console.log('categoryName:',category.categoryName)
      });
      this.isCategoriesLoaded = true; // добавить эту строку
    });
  }

  getImagesToRecipes(recipes: Recipe[]): void {
    recipes.forEach(p => {
      this.imageService.getImageToRecipe(p.recipeId)
        .subscribe(data => {
          p.image = data.imageBytes;
        });
    });
  }


  getCommentsToRecipes(recipes: Recipe[]): void {
    recipes.forEach(p => {
      this.commentService.getCommentsToRecipe(p.recipeId)
        .subscribe(data => {
          p.comments = data;
        });
    });
  }

  getCategoriesToRecipes(recipes: Recipe[]): void {
    recipes.forEach(recipe => {
      this.categoryService.getCategoriesByRecipeId(recipe.recipeId)
        .subscribe(categories => {
          recipe.categoryIds = categories.map(category => category.categoryId);
        });
    });
  }

  removeRecipe(recipe: Recipe, index: number): void {
    console.log(recipe);
    const result = confirm('Do you really want to delete this recipe?');
    if (result) {
      this.recipeService.deleteRecipe(recipe.recipeId)
        .subscribe(() => {
          this.recipes.splice(index, 1);
          this.notificationService.showSnackBar('Recipe deleted');
        });
    }
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  deleteComment(commentId: number, recipeIndex: number, commentIndex: number): void {
    const recipe = this.recipes[recipeIndex];

    this.commentService.deleteComment(commentId)
      .subscribe(() => {
        this.notificationService.showSnackBar('Comment removed');
        recipe.comments.splice(commentIndex, 1);
      });
  }

  toggleNutritionPanel(recipeId: number): void {
    if (this.showNutritionPanel[recipeId]) {
      this.showNutritionPanel[recipeId] = false;
    } else {
      this.showNutritionPanel[recipeId] = true;
    }
  }

}
