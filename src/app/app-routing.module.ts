import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddCodingprofilesComponent } from './add-codingprofiles/add-codingprofiles.component';
import { AddPlacementsComponent } from './add-placements/add-placements.component';
import { CodingprofilesComponent } from './codingprofiles/codingprofiles.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OnlineclassesComponent } from './onlineclasses/onlineclasses.component';
import { PlacementsComponent } from './placements/placements.component';
import { RegisterComponent } from './register/register.component';
import { ViewCodingprofilesComponent } from './view-codingprofiles/view-codingprofiles.component';
import { ViewPlacementsComponent } from './view-placements/view-placements.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"about",component:AboutComponent},
  {path:"dashboard/:username",component:DashboardComponent,children:[
    {path:'onlineclasses',component:OnlineclassesComponent},
    {path:'placements',component:PlacementsComponent,children:[
      {path:"viewplacements",component:ViewPlacementsComponent},
      {path:"addplacements",component:AddPlacementsComponent},
      {
        path:'',redirectTo:'viewplacements',pathMatch:'full'
      }
    ]},
    {path:'coding',component:CodingprofilesComponent,children:[
      {path:"viewcodingprofiles",component:ViewCodingprofilesComponent},
      {path:"addcodingprofiles",component:AddCodingprofilesComponent},
      {
        path:'',redirectTo:'viewcodingprofiles',pathMatch:'full'
      }
    ]},
    {
      path:'',redirectTo:'onlineclasses',pathMatch:'full'
    }
  ]},
  {path:"contactus",component:ContactusComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
