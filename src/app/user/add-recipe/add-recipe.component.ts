import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../../models/Recipe';
import {RecipeService} from '../../service/recipe.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {NotificationService} from '../../service/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipeForm: FormGroup;
  selectedFile: File;
  isRecipeCreated = false;
  createdRecipe: Recipe;
  previewImgURL: any;

  constructor(private recipeService: RecipeService,
              private imageUploadService: ImageUploadService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.recipeForm = this.createRecipeForm();
  }

  createRecipeForm(): FormGroup {
    return this.fb.group({
      recipeName: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {

    this.recipeService.createRecipe({
      recipeName: this.recipeForm.value.recipeName,
      description: this.recipeForm.value.description,
    }).subscribe(data => {
      this.createdRecipe = data;
      console.log(data);

      if (this.createdRecipe.recipeId != null) {
        this.imageUploadService.uploadImageToRecipe(this.selectedFile, this.createdRecipe.recipeId)
          .subscribe(() => {
            this.notificationService.showSnackBar('Recipe created successfully');
            this.isRecipeCreated = true;
            this.router.navigate(['/profile']);
          });
      }
    });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (e) => {
      this.previewImgURL = reader.result;
    };
  }

}
