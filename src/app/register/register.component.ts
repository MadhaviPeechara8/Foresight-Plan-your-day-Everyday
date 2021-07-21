import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //inject UserService object
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    
  }

  onSignup(userObj:any){
    this.us.createUser(userObj).subscribe(
      res=>{
        if(res.message==="User created"){
          alert("User created")
          //navigate to login component
            this.router.navigateByUrl("/login")
        }
        else{
          alert(res.message)
        }
      },
      err=>{
        console.log(err)
        alert("Something went wrong in user creation")
      }
    )
  }

}
