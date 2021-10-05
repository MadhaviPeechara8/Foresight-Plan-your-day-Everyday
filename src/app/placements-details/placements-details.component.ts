import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { placement } from '../models/placement.model';
import { Placements } from '../models/placements.model';

@Component({
  selector: 'app-placements-details',
  templateUrl: './placements-details.component.html',
  styleUrls: ['./placements-details.component.css']
})
export class PlacementsDetailsComponent implements OnInit {

  searchTerm:string;
  p=1
  placements:Placements[]=[];
  editplaceIndex:any;
  editplaceObj=new placement('','','','','')
  editplaceStatus:boolean=false;


  constructor(private dsObj:DataService) { }

  ngOnInit(): void {
    this.getUsers();
  }


  
  getUsers(){
    let username=localStorage.getItem("username")
    this.dsObj.getplacementsData(username).subscribe(
      res=>{
        this.placements=res["message"];
        console.log(this.placements)
      },
      err=>{
        console.log("err in reading products",err)
      }
    )
  }

  //to edit mobile
  editPlacement(placeObj:any,ind:any){

   
    this.editplaceObj=placeObj;
    this.editplaceIndex=ind;
    this.editplaceStatus=true;

    console.log('obj to be edited ',this.editplaceObj)
  }

  //save mobile after edit
  savePlacement(modifiedplaceObj:any){
    this.editplaceStatus=false;
    let username=localStorage.getItem("username")
    modifiedplaceObj.username=username
    modifiedplaceObj.itemTitle=this.editplaceObj["itemTitle"]
    modifiedplaceObj.itemLink=this.editplaceObj["itemLink"]
    modifiedplaceObj.status=this.editplaceObj["status"]
    modifiedplaceObj.description=this.editplaceObj["description"]
   
    this.dsObj.updatePlacement(modifiedplaceObj).subscribe(
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
  deletePlacement(placeObj:any){
   
    console.log("placement to delete",placeObj)
    this.dsObj.deletePlacement(placeObj).subscribe(
      res=>{
        //write getting latest data from API
        this.getUsers();
        alert("placement deleted")
      },
      err=>{
        console.log("err in delete placement",err)
      }
    )
  }


}
