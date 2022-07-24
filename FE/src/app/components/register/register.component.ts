import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';



declare var particlesJS:any
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService :AuthService , private _Router:Router) { }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/Json/particlesjs-config.json')
  }
//Validators.pattern(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,20}$/)

  errorMsg:string = '';
  registerDone:string =""
  registerForm: FormGroup  = new FormGroup({
    userName: new FormControl(null , [Validators.required , Validators.minLength(2), Validators.maxLength(20),]),
    password: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    cPassword: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    age: new FormControl(null, [Validators.required,Validators.min(18), Validators.max(90)]),
    email: new FormControl(null,[Validators.required,Validators.email])
    
  })

  register()
  {
    console.log(this.registerForm.value);
    this._AuthService.registerNewUser(this.registerForm.value).subscribe(
      (res)=>{
        if(res.message == "Done")
        {
          this.registerDone ="Register Done"
          this._Router.navigate(['/login'])
        }
        
        //  if(res.message == "success")
        //  {
        //   this.registerDone ="Register Done"
        //   this._Router.navigate(['/login'])
        //  }
        
      },
      (err)=> {if(err.message)
        {
          this.errorMsg =  "Email already exist"
        }
       
        
      }
    )
  }
}
