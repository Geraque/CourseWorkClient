import {Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../../models/Recipe';
import {RecipeService} from '../../service/recipe.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {NotificationService} from '../../service/notification.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';

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
  categories: any[];
  selectedCategory: number;

  constructor(private recipeService: RecipeService,
              private imageUploadService: ImageUploadService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.recipeForm = this.createRecipeForm();
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  createRecipeForm(): FormGroup {
    return this.fb.group({
      recipeName: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      calories: ['', Validators.compose([Validators.required])],
      proteins: ['', Validators.compose([Validators.required])],
      carbs: ['', Validators.compose([Validators.required])],
      fat: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {

    const recipeNutrition = {
      calories: this.recipeForm.value.calories,
      proteins: this.recipeForm.value.proteins,
      carbs: this.recipeForm.value.carbs,
      fat: this.recipeForm.value.fat
    };

    this.recipeService.createRecipe({
      recipeName: this.recipeForm.value.recipeName,
      description: this.recipeForm.value.description,
      recipeNutrition: recipeNutrition
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

  onCategorySelected(event): void {
    this.selectedCategory = event.value;
  }

  addCategoryToRecipe(): void {
  console.log(this.isRecipeCreated);
  console.log(this.createdRecipe);
  console.log(this.createdRecipe.recipeId);
    if (this.createdRecipe && this.createdRecipe.recipeId != null) {
      this.categoryService.addCategory(this.selectedCategory, this.createdRecipe.recipeId).subscribe(() => {
        this.notificationService.showSnackBar('Category added successfully');
      });
    } else {
      this.notificationService.showSnackBar('Please create the recipe first');
    }
  }

}
