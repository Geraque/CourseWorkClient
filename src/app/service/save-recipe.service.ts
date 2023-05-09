import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../models/Recipe';
import {Observable} from 'rxjs';

const RECIPE_API = 'http://localhost:8080/api/recipeSave/';

@Injectable({
  providedIn: 'root'
})
export class SaveRecipeService {


  constructor(private http: HttpClient) {
  }

  saveRecipe(userId: number, recipeId: number): Observable<any> {
    return this.http.post(RECIPE_API + 'save/'+ userId +'/'+recipeId, null);
  }

  deleteRecipe(userId: number, recipeId: number): Observable<any> {
    return this.http.post(RECIPE_API + 'delete/'+ userId +'/'+recipeId, null);
  }

  isSaved(userId: number, recipeId: number): Observable<any> {
    return this.http.post(RECIPE_API + 'isSaved/'+ userId +'/'+recipeId, null);
  }

  getRecipes(userId: number): Observable<any> {
    return this.http.post(RECIPE_API + userId +'/recipes', null);
  }
}
