import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../service/notification.service';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-user-profile-edit-user',
  templateUrl: './user-profile-edit-user.component.html',
  styleUrls: ['./user-profile-edit-user.component.css']
})
export class UserProfileEditUserComponent {

  public profileEditForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<UserProfileEditUserComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup {
  console.log('user: ',this.data.user)
    return this.fb.group({
      firstName: [
        this.data.user.firstname,
        Validators.compose([Validators.required])
      ],
      lastName: [
        this.data.user.lastname,
        Validators.compose([Validators.required])
      ],
    });
  }

  submit(): void {
    this.userService.updateUserByAdmin(this.updateUser())
      .subscribe(() => {
        this.notificationService.showSnackBar('User updated successfully');
        this.dialogRef.close();
      });
  }

  private updateUser(): User {
    this.data.user.firstname = this.profileEditForm.value.firstName;
    this.data.user.lastname = this.profileEditForm.value.lastName;
    return this.data.user;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
