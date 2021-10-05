import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { placement } from '../models/placement.model';

@Component({
  selector: 'app-add-placements',
  templateUrl: './add-placements.component.html',
  styleUrls: ['./add-placements.component.css']
})
export class AddPlacementsComponent implements OnInit {

  constructor(private dsObj:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  placementModel=new placement('','','','','');

  onSubmitnewplacement(){
    let username=localStorage.getItem('username');
    if(username!=null)
    this.placementModel.username=username;
    
      this.dsObj.createnewplacement(this.placementModel).subscribe(
        res=>{
          
          this.router.navigateByUrl(`dashboard/${username}/placements/viewplacements`)

        },
        err=>{
          console.log('err in creating new placement',err)
        }
      )
  }

}
