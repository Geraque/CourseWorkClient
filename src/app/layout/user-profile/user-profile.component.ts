import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {ImageUploadService} from '../../service/image-upload.service';
import {FollowerService} from '../../service/follower.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  isUserDataLoaded = false;
  user: User;
  userProfileImage: File;
  previewImgURL: any;
  myId: string;
  isFollowing: boolean;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private imageService: ImageUploadService,
              private followerService: FollowerService,) {}

ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.myId = data.userId;
        this.isUserDataLoaded = true;
      });

  this.route.params.subscribe(params => {
    this.userService.getUserByUsername(params['username']).subscribe(data => {
      this.user = data;
      console.log('username', data.username);
      // Add a console log here to check if the IDs are defined
      console.log('My ID:', this.myId);
      console.log('User ID:', this.user.userId);

      this.isUserDataLoaded = true;

      this.imageService.getSearchProfileImage(this.user.username).subscribe(data => {
        this.userProfileImage = data.imageBytes;

        // Check if the IDs are not null or undefined before making the request
      this.followerService.isFollowing(this.myId, this.user.userId).subscribe(resp => {
        this.isFollowing = resp.isFollowing;
      });
      });
    });
  });
}

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  onFollowButtonClick() {
    if (this.isFollowing) {
      this.followerService.unfollowToUser(this.myId, this.user.userId).subscribe(() => this.isFollowing = false);
    } else {
      this.followerService.followToUser(this.myId, this.user.userId).subscribe(() => this.isFollowing = true);
    }
  }

}
