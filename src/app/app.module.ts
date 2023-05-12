import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MaterialModule} from './material-module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {authInterceptorProviders} from './helper/auth-interceptor.service';
import {authErrorInterceptorProviders} from './helper/error-interceptor.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { IndexComponent } from './layout/index/index.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserRecipesComponent } from './user/user-recipes/user-recipes.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddRecipeComponent } from './user/add-recipe/add-recipe.component';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import { UserProfileRecipesComponent } from './layout/user-profile-recipes/user-profile-recipes.component';
import { FavouritesComponent } from './layout/favourites/favourites.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    IndexComponent,
    ProfileComponent,
    UserRecipesComponent,
    EditUserComponent,
    AddRecipeComponent,
    UserProfileComponent,
    UserProfileRecipesComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [authInterceptorProviders, authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
