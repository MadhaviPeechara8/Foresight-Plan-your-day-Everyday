import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userLoginStatus=false;

  constructor(private hc:HttpClient) { }

  createUser(userObj:any):Observable<any>{
    return  this.hc.post("/user/createuser",userObj)
  }

  loginUser(credentials:any):Observable<any>{
    return  this.hc.post("/user/login",credentials)
  }




  getUser(username:any):Observable<any>{
      return this.hc.get(`/user/getuser/${username}`)
  }
}
