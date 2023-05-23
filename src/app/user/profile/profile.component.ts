import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {TokenStorageService} from '../../service/token-storage.service';
import {RecipeService} from '../../service/recipe.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../service/notification.service';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {ImageUploadService} from '../../service/image-upload.service';
import {UserService} from '../../service/user.service';
import {FollowerService} from '../../service/follower.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserDataLoaded = false;
  user: User;
  selectedFile: File;
  userProfileImage: File;
  previewImgURL: any;
  followersCount: number;

  constructor(
      private tokenService: TokenStorageService,
      private recipeService: RecipeService,
      private dialog: MatDialog,
      private notificationService: NotificationService,
      private imageService: ImageUploadService,
      private userService: UserService,
      private followerService: FollowerService,
    ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;

        this.followerService.countFollow(this.user.userId).subscribe(resp => {
          this.followersCount = resp;
          console.log('followersCount:', this.followersCount);
        });
      });

    this.imageService.getProfileImage()
      .subscribe(data => {
        this.userProfileImage = data.imageBytes;
      });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImgURL = reader.result;
    };
  }

  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      user: this.user
    };
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.imageService.uploadImageToUser(this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar('Profile Image updated successfully');
        });
    }
  }

  downloadStats(): void {
    this.recipeService.getStats().subscribe((data) => {
    console.log(this.user.userId)
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      saveAs(blob, 'recipes.xlsx');
    });
  }
}
