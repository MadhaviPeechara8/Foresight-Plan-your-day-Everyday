import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CodingProfile } from '../models/profile.model';

@Component({
  selector: 'app-add-codingprofiles',
  templateUrl: './add-codingprofiles.component.html',
  styleUrls: ['./add-codingprofiles.component.css']
})
export class AddCodingprofilesComponent implements OnInit {

  constructor(private dsObj:DataService,private router:Router) { }


  ngOnInit(): void {
  }
  profileModel=new CodingProfile('','','','','');

  onSubmitnewprofile(){
    let username=localStorage.getItem('username');
    if(username!=null)
    this.profileModel.username=username;
    
      this.dsObj.createnewprofile(this.profileModel).subscribe(
        res=>{
          
          this.router.navigateByUrl(`dashboard/${username}/coding/viewcodingprofiles`)

        },
        err=>{
          console.log('err in creating new profile',err)
        }
      )
  }
}
