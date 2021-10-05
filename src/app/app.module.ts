import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from'@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { OnlineclassesComponent } from './onlineclasses/onlineclasses.component';
import { AboutComponent } from './about/about.component';
import { PlacementsComponent } from './placements/placements.component';
import { AddPlacementsComponent } from './add-placements/add-placements.component';
import { PlacementsDetailsComponent } from './placements-details/placements-details.component';
import { ViewPlacementsComponent } from './view-placements/view-placements.component'
import { SearchPipe } from './search.pipe';
import { ContactusComponent } from './contactus/contactus.component';
import { CodingprofilesComponent } from './codingprofiles/codingprofiles.component';
import { AddCodingprofilesComponent } from './add-codingprofiles/add-codingprofiles.component';
import { ViewCodingprofilesComponent } from './view-codingprofiles/view-codingprofiles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    OnlineclassesComponent,
    AboutComponent,
    PlacementsComponent,
    AddPlacementsComponent,
    PlacementsDetailsComponent,
    ViewPlacementsComponent,
    SearchPipe,
    ContactusComponent,
    CodingprofilesComponent,
    AddCodingprofilesComponent,
    ViewCodingprofilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
