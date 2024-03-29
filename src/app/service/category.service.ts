import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../models/Recipe';
import {Observable} from 'rxjs';

const CATEGORY_API = 'http://localhost:8080/api/category/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) {
    }

    getAllCategories(): Observable<any> {
      return this.http.get(CATEGORY_API + 'all');
    }

    getCategoryNameByCategoryId(categoryId: number): Observable<any> {
      return this.http.post(CATEGORY_API + 'name'+ categoryId,null);
    }

    getCategoriesByRecipeId(recipeId: number): Observable<any> {
      return this.http.post('http://localhost:8080/api/recipeCategory/all/'+ recipeId,null);
    }

    addCategory(categoryId: number, recipeId: number): Observable<any> {
      return this.http.post('http://localhost:8080/api/recipeCategory/add/'+categoryId+'/'+ recipeId,null);
   }
}
