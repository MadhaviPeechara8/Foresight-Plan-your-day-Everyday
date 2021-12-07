import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { WebinarCls } from '../models/webinar.model';

@Component({
  selector: 'app-admindb',
  templateUrl: './admindb.component.html',
  styleUrls: ['./admindb.component.css']
})
export class AdmindbComponent implements OnInit {

  constructor(private dsObj:DataService,private router:Router) { }

  ngOnInit(): void {
    this.getWebinars();
  }
  webinarObj=new WebinarCls('','','','','','','');
  webinars:any[]=[];
  getWebinars(){
    this.dsObj.getWebinarsData().subscribe(
      res=>{
        console.log("webinars"+res);
        this.webinars=res["message"];
      },
      err=>{
        console.log("err is",err);
      }
    )
  }
  deleteWebinar(clsObj:any){
    console.log("Deleting obj",clsObj)
    this.dsObj.deleteWebinar(clsObj).subscribe(
      res=>{
        this.dsObj.getWebinarsData().subscribe(
          res=>{
            this.webinars=res["message"];
          },
          err=>{
            console.log("err is",err);
          }
        )
        console.log("Obj deleted")
      },err=>{
        console.log("err is",err)
      }
    )
    
  }
  onSubmitNewWebinar(){
    let username=localStorage.getItem("username")
    this.webinarObj.username=username;
    this.dsObj.createWebinar(this.webinarObj).subscribe(
      res=>{
      this.getWebinars();
      console.log("after fun"+this.webinars);

        this.dsObj.getWebinarsData().subscribe(
          res=>{
            this.webinars=res["message"];
          },
          err=>{
            console.log("err is",err);
          }
        )
        console.log("before webinars: "+this.webinars)
        this.webinarObj.WebinarName='';
        this.webinarObj.WebDate='';
        this.webinarObj.description='';
        this.webinarObj.speaker='';
        this.webinarObj.time='';
        this.webinarObj.webLink='';
       
      },
      err=>{
        console.log("err is",err)
      }
    )
  }


}
