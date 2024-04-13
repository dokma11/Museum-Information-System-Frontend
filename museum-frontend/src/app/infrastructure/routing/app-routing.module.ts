import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "src/app/feature-modules/layout/home/home.component";
import { LoginComponent } from "../auth/login/login.component";
import { RegistrationComponent } from "../auth/registration/registration.component";
import { EmployeesViewComponent } from "src/app/feature-modules/administration/employees-view/employees-view.component";
import { TourViewComponent } from "src/app/feature-modules/tours/tour-view/tour-view.component";
import { UserProfileComponent } from "src/app/feature-modules/stakeholder/components/user-profile/user-profile.component";
import { EditProfileComponent } from "src/app/feature-modules/stakeholder/components/edit-profile/edit-profile.component";

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegistrationComponent 
  },
  {
    path: 'employee-view',
    component: EmployeesViewComponent
  },
  {
    path: 'tour-view',
    component: TourViewComponent
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: UserProfileComponent
      },
      {
        path: 'edit',
        component: EditProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}