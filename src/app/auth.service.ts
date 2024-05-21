
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})

// @Inject()
export class AuthService {
 
  decodedToken:{[key:string]:string;} | undefined;
   
  user:any;

  constructor(private cookie:CookieService,private router:Router) { }
  
  // isAuthenticated(): boolean {
  //   const token = this.cookie.get('app_token');
  //   if (!token) {
  //     return false;
  //   }

  //   const payload = atob(token.split('.')[1]);
  //   const parsedPayload = JSON.parse(payload);
  //   const isExpired = parsedPayload.exp > Date.now() / 1000;

  //   if (isExpired) {
  //     this.decodedToken = parsedPayload;
  //     this.user = this.decodedToken;
  //   }

  //   return isExpired;
  // }

 




  isLoggedIn() {
    var isExpired = false;
    const token = this.cookie.get('app_token');
    if (token) {
      
      const payload = atob(token.split('.')[1]);
      
      const parsedPayload = JSON.parse(payload); // convert payload into an Object
      
      isExpired = parsedPayload.exp > Date.now() / 1000; 
    }
    return isExpired;
  }

  getUser(){
    const token =  this.cookie.get('app_token');
    if (token) {
      
      const payload = atob(token.split('.')[1]);
      
      this.decodedToken= JSON.parse(payload); 
      
      return this.decodedToken;
    }
    return null;
  }

  getUserRole(){
    this.getUser();
    return this.decodedToken ? this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : undefined;
  }

  onLogout(){
    this.cookie.delete('app_token'); 

  }

 

  getToken(){
    return this.cookie.get('app_token');
  }
}

