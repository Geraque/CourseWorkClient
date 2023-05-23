import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {IndexComponent} from './layout/index/index.component';
import {AuthGuardService} from './helper/auth-guard.service';
import {ProfileComponent} from './user/profile/profile.component';
import {UserRecipesComponent} from './user/user-recipes/user-recipes.component';
import {AddRecipeComponent} from './user/add-recipe/add-recipe.component';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import { UserProfileRecipesComponent } from './layout/user-profile-recipes/user-profile-recipes.component';
import { FavouritesComponent } from './layout/favourites/favourites.component';
import { AdminComponent } from './auth/admin/admin.component';
import {AdminService} from './helper/admin.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
  { path: 'favorites', component: FavouritesComponent, canActivate: [AuthGuardService] },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: UserRecipesComponent, canActivate: [AuthGuardService]},
      {path: 'add', component: AddRecipeComponent, canActivate: [AuthGuardService]}
    ]
  },
  {
    path: 'profile/:username', component: UserProfileComponent,canActivate: [AuthGuardService], children: [
      {path: '', component: UserProfileRecipesComponent, canActivate: [AuthGuardService]}
    ]
   },
   { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
  {path: '', redirectTo: 'main', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
