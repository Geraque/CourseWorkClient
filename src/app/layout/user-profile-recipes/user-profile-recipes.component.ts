import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {RecipeService} from '../../service/recipe.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';
import {User} from '../../models/User';
import {UserService} from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-recipes.',
  templateUrl: './user-profile-recipes.component.html',
  styleUrls: ['./user-profile-recipes.component.css']
})
export class UserProfileRecipesComponent implements OnInit {

  isUserRecipesLoaded = false;
  recipes: Recipe [];
  user: User;
  username: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private recipeService: RecipeService,
              private imageService: ImageUploadService,
              private commentService: CommentService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];

      this.userService.getUserByUsername(this.username)
        .subscribe(user => {
          this.user = user; // сохраняем пользователя
          this.loadRecipes(); // загружаем рецепты после получения пользователя
        });
    });
  }

  loadRecipes() {
    this.recipeService.getRecipeForUsername(this.username)
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
