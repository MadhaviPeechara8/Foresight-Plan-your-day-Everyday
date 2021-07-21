import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
