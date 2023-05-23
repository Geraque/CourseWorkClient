import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../models/Recipe';
import {Observable} from 'rxjs';

const RECIPE_API = 'http://localhost:8080/api/recipe/';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {
  }

  createRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(RECIPE_API + 'create', recipe);
  }

  getAllRecipes(): Observable<any> {
    return this.http.get(RECIPE_API + 'all');
  }

  getRecipeForCurrentUser(): Observable<any> {
    return this.http.get(RECIPE_API + 'user/recipes');
  }

  getRecipeForUsername(username: string): Observable<any> {
    return this.http.post(RECIPE_API + username+'/recipes', null);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.post(RECIPE_API + id + '/delete', null);
  }

  likeRecipe(id: number, username: string): Observable<any> {
    return this.http.post(RECIPE_API + id + '/' + username + '/like', null);
  }

  getStats(userId: number): Observable<any> {
    return this.http.get(RECIPE_API + 'download2');
  }

  getNutrition(nutritionId: number): Observable<any> {
    return this.http.post(RECIPE_API + nutritionId+ '/nutrition', null);
  }
}
