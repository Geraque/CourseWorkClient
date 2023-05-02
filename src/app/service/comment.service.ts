import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const COMMENT_API = 'http://localhost:8080/api/comment/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  addToCommentToRecipe(recipeId: number, commentText: string): Observable<any> {
    return this.http.post(COMMENT_API + recipeId + '/create', {
      commentText: commentText
    });
  }

  getCommentsToRecipe(recipeId: number): Observable<any> {
    return this.http.get(COMMENT_API + recipeId + '/all');
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.post(COMMENT_API + commentId + '/delete', null);
  }

}
