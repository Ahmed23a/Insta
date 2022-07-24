import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  registerNewUser(obj:any):Observable<any>
  {
   return  this._HttpClient.post(`http://localhost:3000/api/v1/auth/signup`,obj)
  }

  loginUser(obj:any):Observable<any>
  {
    return this._HttpClient.post(`http://localhost:3000/api/v1/auth/signin`,obj)
  }
}
