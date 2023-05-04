import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const FOLLOWER_API = 'http://localhost:8080/api/follower/';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  constructor(private http: HttpClient) { }

    followToUser(followerId: string, userId: number):Observable<any> {
      return this.http.post(FOLLOWER_API +'follow/'+ followerId+'/' + userId,null);
    }

    unfollowToUser(followerId: string, userId: number):Observable<any> {
      return this.http.post(FOLLOWER_API +'unfollow/'+ followerId+'/' + userId,null);
    }

    isFollowing(followerId: string, userId: number):Observable<any> {
      return this.http.post(FOLLOWER_API +'isFollowing/'+ followerId+'/' + userId,null);
    }
}
