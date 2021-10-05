import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CodingProfile } from '../models/profile.model';

@Component({
  selector: 'app-view-codingprofiles',
  templateUrl: './view-codingprofiles.component.html',
  styleUrls: ['./view-codingprofiles.component.css']
})
export class ViewCodingprofilesComponent implements OnInit {

  searchTerm:string;
  p=1
  profiles:CodingProfile[]=[];
  editplaceIndex:any;
  editplaceObj=new CodingProfile('','','','','')
  editplaceStatus:boolean=false;

  constructor(private dsObj:DataService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    let username=localStorage.getItem("username")
    this.dsObj.getprofilesData(username).subscribe(
      res=>{
        this.profiles=res["message"];
        console.log(this.profiles)
      },
      err=>{
        console.log("err in reading products",err)
      }
    )
  }

  //to edit mobile
  editProfile(placeObj:any,ind:any){

   
    this.editplaceObj=placeObj;
    this.editplaceIndex=ind;
    this.editplaceStatus=true;

    console.log('obj to be edited ',this.editplaceObj)
  }

  //save mobile after edit
  saveProfile(modifiedplaceObj:any){
    this.editplaceStatus=false;
    let username=localStorage.getItem("username")
    modifiedplaceObj.username=username
    modifiedplaceObj.ProfileName=this.editplaceObj["ProfileName"]
    modifiedplaceObj.Link=this.editplaceObj["Link"]
    modifiedplaceObj.Score=this.editplaceObj["Score"]
    modifiedplaceObj.Description=this.editplaceObj["Description"]
   
    this.dsObj.updateProfile(modifiedplaceObj).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log("err in update ",err)
      }
    )
  }


 // @HostListener("click", ["$event"])

  //delete mobile
  deleteProfile(placeObj:any){
   
    console.log("CodingProfile to delete",placeObj)
    this.dsObj.deleteProfile(placeObj).subscribe(
      res=>{
        //write getting latest data from API
        this.getUsers();
        alert("CodingProfile deleted")
      },
      err=>{
        console.log("err in delete CodingProfile",err)
      }
    )
  }


}
