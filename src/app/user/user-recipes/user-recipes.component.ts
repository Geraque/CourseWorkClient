import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {RecipeService} from '../../service/recipe.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {

  isUserRecipesLoaded = false;
  recipes: Recipe [];

  constructor(private recipeService: RecipeService,
              private imageService: ImageUploadService,
              private commentService: CommentService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.recipeService.getRecipeForCurrentUser()
      .subscribe(data => {
        console.log(data);
        this.recipes = data;
        this.getImagesToRecipes(this.recipes);
        this.getCommentsToRecipes(this.recipes);
        this.isUserRecipesLoaded = true;
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

}
