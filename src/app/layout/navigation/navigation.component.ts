import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { TokenStorageService } from '../../service/token-storage.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  user: User;
  searchTerm: string;

  constructor(
    private tokenService: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if(this.isLoggedIn) {
      this.userService.getCurrentUser()
        .subscribe(data => {
          this.user = data;
          this.isDataLoaded = true;
        })
    }
  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  onSearch(event): void {
    event.preventDefault();

    if (this.searchTerm) {
      this.router.navigate(['/profile/', this.searchTerm]);
      this.searchTerm = '';
    }
  }

}
