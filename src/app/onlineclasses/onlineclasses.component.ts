import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { OnlineCls } from '../models/onlinecls.model';
import { TodoCls } from '../models/todo.model';
import { WebinarCls } from '../models/webinar.model';

@Component({
  selector: 'app-onlineclasses',
  templateUrl: './onlineclasses.component.html',
  styleUrls: ['./onlineclasses.component.css']
})
export class OnlineclassesComponent implements OnInit {
  classes:any[]=[];
 editClassIndex:number=-1;
 todo:any[]=[];
 webinars:any[]=[];
 //let un=localStorage.getItem("username");
 editClassObj=new OnlineCls('','','','','');
 onlineclsObj=new OnlineCls('','','','','');
 todoObj=new TodoCls('','');
 webinarObj=new WebinarCls('','','','','','','');
timetable:any=[]; 
 editClassStatus:boolean=false;
 timetablestatus:boolean;
 constructor(private dsObj:DataService,private router:Router) { 
   
 }


  ngOnInit(): void {
    this.getClasses();
    this.getTodos();
    this.getWebinars();
    this.gettimetable();
    if(this.timetable.length==1){
    this.timetablestatus=true;
    }
    console.log("tt: pi",this.timetable["0"].productImage);
  }
  file:File;
  selectFile(event:any){
    this.file=event.target.files[0];
    //console.log(this.file)
  }
  onsubtt(userObj:any){
    //create formdata obj
    let un=localStorage.getItem("username");
    userObj.username=un;
    let formData=new FormData();
    //add file
    formData.append("photo",this.file,this.file.name);
    //add userobj
    formData.append("userObj",JSON.stringify(userObj))
    this.dsObj.createNewtime(formData).subscribe(
      res=>{
        this.gettimetable();
      },
      err=>{
        console.log(err)
        alert("Something went wrong in time table addition")
      }
    )
}
  gettimetable(){
    let username=localStorage.getItem("username");
    this.dsObj.gettimetable(username).subscribe(
      res=>{
        this.timetable=res["message"];
        console.log("tt",this.timetable[0]);
        console.log("len:",this.timetable.length);
        if(this.timetable.length==0){
          this.timetablestatus=false;
          }
          if(this.timetable.length==1){
            this.timetablestatus=true;
          }
      }
    )
  }
  deletett(obj:any){
    console.log("Time t:",obj)
    this.dsObj.deletetimetable(obj).subscribe(
      res=>{
      this.gettimetable();
      },
      err=>{
        console.log("err is",err);
       
      }
    )
  }
  getClasses(){
    this.dsObj.getOnlineClsesData().subscribe(
      res=>{
        console.log(res);
        this.classes=res["message"];
      },
      err=>{
        console.log("err is",err);
      }
    )
  }
  getTodos(){
    this.dsObj.getTodosData().subscribe(
      res=>{
        console.log(res);
        this.todo=res["message"];
      },
      err=>{
        console.log("err is",err);
      }
    )
  }

  getWebinars(){
    this.dsObj.getWebinarsData().subscribe(
      res=>{
        console.log(res);
        this.webinars=res["message"];
      },
      err=>{
        console.log("err is",err);
      }
    )
  }

  editClass(clsObj:any,ind:any){
    this.editClassObj=clsObj;
    this.editClassIndex=ind;
    this.editClassStatus=true;
    console.log(this.editClassObj);
      }
  saveClass(modifiedClassObj:any){
    this.editClassStatus=false;
    //console.log("edit obj",this.editClassObj);
    modifiedClassObj.ClassType=this.editClassObj["ClassType"];
    modifiedClassObj.ClassLink=this.editClassObj["ClassLink"];
    modifiedClassObj.ClassName=this.editClassObj["ClassName"];
    modifiedClassObj.description=this.editClassObj["description"];
    //console.log("modified obj is ",modifiedClassObj)
this.dsObj.updateClass(this.editClassObj).subscribe(
  res=>{
    console.log(res)
  },
  err=>{
    console.log("err is",err)
  }
  
)
  }
  deleteClass(clsObj:any){
    console.log("Deleting obj",clsObj)
    this.dsObj.delobjcls(clsObj).subscribe(
      res=>{
        this.dsObj.getOnlineClsesData().subscribe(
          res=>{
            this.classes=res["message"];
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
  
  
  onSubmitNewClass(){
    let cl= this.onlineclsObj.ClassLink;
    let cn=this.onlineclsObj.ClassName;
    let d=this.onlineclsObj.description;
    let ct=this.onlineclsObj.ClassType;
    let username=localStorage.getItem('username');
    if(username!=null)
    this.onlineclsObj.username=username;
    console.log(this.onlineclsObj)
    this.dsObj.createNewClass(this.onlineclsObj).subscribe(
      res=>{
       this.getClasses();
       console.log(this.classes)
       this.onlineclsObj.ClassLink='';
       this.onlineclsObj.ClassName='';
       this.onlineclsObj.description='';
       this.onlineclsObj.ClassType='';
      },
      err=>{
        console.log("err is",err)
      }
    )
  }
  deleteTodo(clsObj:any){
    console.log("Deleting obj",clsObj)
    this.dsObj.deleteTodo(clsObj).subscribe(
      res=>{
        this.dsObj.getTodosData().subscribe(
          res=>{
            this.todo=res["message"];
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
  onAddTodoItem(itemTitle:any){
    this.todoObj.Task=itemTitle.value;
    console.log(itemTitle.value)
    let username=localStorage.getItem('username');
    if(username!=null)
    this.todoObj.username=username;
    this.dsObj.createNewtodo(this.todoObj).subscribe(
      res=>{
        itemTitle.value="";
        //console.log(itemTitle.value)
        this.getTodos();
      },
      err=>{
        console.log("err is",err)
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
    this.dsObj.createNewWebinar(this.webinarObj).subscribe(
      res=>{
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
