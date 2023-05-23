import { Component, OnInit } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/User';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {NotificationService} from '../../service/notification.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  public registerForm: FormGroup;
  isUserDataLoaded = false;
  user: User;
  check = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
  }

ngOnInit(): void {
  console.log(this.check)
  this.registerForm = this.createRegisterForm();

  this.userService.getCurrentUser()
    .subscribe(data => {
      this.user = data;
      this.isUserDataLoaded = true;

      this.userService.isAdmin(this.user.userId)
        .subscribe(data => {
          this.check = data;
          console.log(this.check);
          if(!this.check){
            this.router.navigate(['main']);
          }
        });
    });
}

  createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      isAdmin: [false],
    });
  }

  submit(): void {
    console.log(this.registerForm.value);
    if (this.registerForm.value.isAdmin) {
      this.authService.registerAdmin({
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
      }).subscribe(data => {
        console.log(data);
        this.notificationService.showSnackBar('Successfully Registered!');
      }, error => {
        this.notificationService.showSnackBar('Something went wrong during registration');
      });
    } else{
      this.authService.register({
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
      }).subscribe(data => {
        console.log(data);
        this.notificationService.showSnackBar('Successfully Registered!');
      }, error => {
        this.notificationService.showSnackBar('Something went wrong during registration');
      });
    }
  }

}
