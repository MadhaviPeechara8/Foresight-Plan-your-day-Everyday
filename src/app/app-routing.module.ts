import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OnlineclassesComponent } from './onlineclasses/onlineclasses.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"dashboard/:username",component:DashboardComponent,children:[
    {path:'onlineclasses',component:OnlineclassesComponent}
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
