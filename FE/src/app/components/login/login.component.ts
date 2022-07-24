import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var particlesJS:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }
  errMsg:string = ""
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
  })
  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/Json/particlesjs-config.json')
  }

  login()
  {
    console.log(this.loginForm)
    this._AuthService.loginUser(this.loginForm.value).subscribe(
      (res)=>{
        if(res.message =="success")
        {
          console.log(res.token);
          
          this._Router.navigate(["/profile"])
        }else
        {
          this.errMsg = res.message
        }

      },
      (err)=>{this.errMsg = err.message}
    )
  }
}
