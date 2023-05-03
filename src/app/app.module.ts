import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [authInterceptorProviders, authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
