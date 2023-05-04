import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {User} from '../../models/User';
import {RecipeService} from '../../service/recipe.service';
import {UserService} from '../../service/user.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {SaveRecipeService} from '../../service/save-recipe.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isRecipesLoaded = false;
  recipes: Recipe[];
  isUserDataLoaded = false;
  user: User;
  isSaved: {[key: number]: boolean} = {};

constructor(private recipeService: RecipeService,
    private userService: UserService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private imageService: ImageUploadService,
    private saveRecipeService: SaveRecipeService //добавьте это
) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes()
      .subscribe(data => {
        console.log(data);
        this.recipes = data;
        this.getImagesToRecipes(this.recipes);
        this.getCommentsToRecipes(this.recipes);
        this.isRecipesLoaded = true;
      });

  this.userService.getCurrentUser()
    .subscribe(data => {
      console.log(data);
      this.user = data;
      this.isUserDataLoaded = true;
      this.recipes.forEach(recipe => this.checkIfRecipeIsSaved(recipe.recipeId));
    });
  }

  getImagesToRecipes(recipes: Recipe[]): void {
    recipes.forEach(p => {
      this.imageService.getImageToRecipe(p.recipeId)
        .subscribe(data => {
          p.image = data.imageBytes;
        })
    });
  }

  getCommentsToRecipes(recipes: Recipe[]): void {
    recipes.forEach(p => {
      this.commentService.getCommentsToRecipe(p.recipeId)
        .subscribe(data => {
          p.comments = data
        })
    });
  }

  likeRecipe(recipeId: number, recipeIndex: number): void {
    const  recipe = this.recipes[recipeIndex];
    console.log(recipe);

    if (!recipe.usersLiked.includes(this.user.username)) {
      this.recipeService.likeRecipe(recipeId, this.user.username)
        .subscribe(() => {
          recipe.usersLiked.push(this.user.username);
          this.notificationService.showSnackBar('Liked!');
        });
    } else {
      this.recipeService.likeRecipe(recipeId, this.user.username)
        .subscribe(() => {
          const index = recipe.usersLiked.indexOf(this.user.username, 0);
          if (index > -1) {
            recipe.usersLiked.splice(index, 1);
          }
        });
    }
  }

  recipeComment(commentText: string, recipeId: number, recipeIndex: number): void {
    const recipe = this.recipes[recipeIndex];

    console.log(recipe);
    this.commentService.addToCommentToRecipe(recipeId, commentText)
      .subscribe(data => {
        console.log(data);
        recipe.comments.push(data);
      });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

 checkIfRecipeIsSaved(recipeId: number) {
   this.saveRecipeService.isSaved(this.user.userId, recipeId).subscribe(resp => {
     this.isSaved[recipeId] = resp.isSaved;
   });
 }
 onFollowButtonClick(recipeId: number) {
   if (this.isSaved[recipeId]) {
     this.saveRecipeService.deleteRecipe(this.user.userId, recipeId).subscribe(() => {
       this.isSaved[recipeId] = false;
       this.notificationService.showSnackBar('Рецепт удален из коллекции');
     });
   } else {
     this.saveRecipeService.saveRecipe(this.user.userId, recipeId).subscribe(() => {
       this.isSaved[recipeId] = true;
       this.notificationService.showSnackBar('Рецепт сохранен!');
     });
   }
 }

}
