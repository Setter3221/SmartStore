
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private cookie:CookieService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.authService.getUserRole();
    
    // if(state.url==='/logout'){
    //   return true;
    // }
    if (userRole === 'Admin' && this.authService.isLoggedIn()) {
      return true;
    } 
    else {
   
      this.router.navigate(['/login']);
      return false;
    }
  }
}


