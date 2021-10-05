import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Placements } from './models/placements.model';
import { CodingProfile } from './models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private hc:HttpClient) { }
  createNewClass(onlineclsObj:any):Observable<any>{
    return this.hc.post("/user/addOnlinecls",onlineclsObj)
  }
  getOnlineClsesData():Observable<any[]>{
    let username=localStorage.getItem("username");
    return this.hc.get<any[]>(`/user/getclass/${username}`);
  }
  updateClass(modifiedClassObj:any):Observable<any>{
    return this.hc.put("/user/updateclass",modifiedClassObj);
 }
 deleteClass(obj:any):Observable<any>{
   console.log(obj);
  return this.hc.delete<any[]>(`/user/deleteclass/${obj}`);
}
delobjcls(obj:any){
  return this.hc.put("/user/deleteclass",obj);
}
getTodosData():Observable<any[]>{
  let username=localStorage.getItem("username");
    return this.hc.get<any[]>(`/user/gettodo/${username}`);
}
createNewtodo(Obj:any):Observable<any>{
  return this.hc.post("/user/addtodo",Obj);
}
deleteTodo(Obj:any):Observable<any>{
  return this.hc.put("/user/deletetodo",Obj);
}
getWebinarsData():Observable<any[]>{
  let username=localStorage.getItem("username");
  return this.hc.get<any[]>(`/user/getwebinar/${username}`);
}
createNewWebinar(Obj:any):Observable<any>{
  console.log(Obj)
  return this.hc.post("/user/addwebinar",Obj);
}
deleteWebinar(Obj:any):Observable<any>{
  console.log(Obj);
  return this.hc.put("/user/deletewebinar",Obj);
}
deletetimetable(Obj:any):Observable<any>{
  console.log("ds tt",Obj);
  return this.hc.put("/user/deletetimetable",Obj);
}
gettimetable(username:any):Observable<any>{
  return this.hc.get<any[]>(`/user/gettimetable/${username}`);
}
createNewtime(Obj:any):Observable<any>{
  return this.hc.post("/user/addtt",Obj);
}
createnewplacement(newone:any):Observable<any>{
  return this.hc.post("/user/addplacements",newone)
}
getplacementsData(username:any):Observable<Placements[]>{
  return this.hc.get<Placements[]>(`/user/getplacements/${username}`)
}
updatePlacement(modifiedObj:any):Observable<any>{
  return this.hc.put("/user/updateplacement",modifiedObj);
}

//delete mobile
deletePlacement(Obj:any):Observable<any>{
  return this.hc.put("/user/deleteplacement",Obj);
}
createnewprofile(newone:any):Observable<any>{
  return this.hc.post("/user/addcodingprofiles",newone)
}
getprofilesData(username:any):Observable<CodingProfile[]>{
  return this.hc.get<CodingProfile[]>(`/user/getprofiles/${username}`)
}
updateProfile(modifiedObj:any):Observable<any>{
  return this.hc.put("/user/updateprofile",modifiedObj);
}
deleteProfile(Obj:any):Observable<any>{
  return this.hc.put("/user/deleteprofile",Obj);
}
}
