import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {TokenStorageService} from '../service/token-storage.service';
import {UserService} from '../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.tokenService.getUser();
    console.log('CurrentUser:', currentUser);

    if (!currentUser) {
      this.router.navigate(['main']);
      return false;
    }

    return this.userService.isAdmin(currentUser.userId).pipe(
      map((isAdmin) => {
        console.log('IsAdmin:', isAdmin);
        if (isAdmin) {
          return true;
        }
        // Если пользователь не админ, перенаправьте его на другую страницу
        this.router.navigate(['main']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['main']);
        return of(false);
      })
    );
  }
}
