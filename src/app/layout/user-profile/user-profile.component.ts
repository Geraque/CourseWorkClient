import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {ImageUploadService} from '../../service/image-upload.service';

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

  constructor(private userService: UserService, private route: ActivatedRoute,
              private imageService: ImageUploadService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getUserByUsername(params['username']).subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
        this.imageService.getSearchProfileImage(this.user.username).subscribe(data => {
          this.userProfileImage = data.imageBytes;
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
}
