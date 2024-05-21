import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // loggedIn: boolean = false;
  $loggedIn=new BehaviorSubject<boolean>(false);
  role:any;
 
  constructor(private router:Router,private productsrv:ProductService,private cookie:CookieService,public authService:AuthService){




  }
 searchString:string="";
 find:boolean=true;



searchProducts(){
  this.router.navigate([`/search/products/${this.searchString}`]);
}



hasCustomerRole(): boolean {
  if (!this.authService.isLoggedIn()) {
    return false;
  }
  return this.authService.getUserRole() === 'Customer';
}


onLogin(){
this.router.navigate(['/login']);
}



onLogout() {
  
   this.authService.onLogout();
  

  //  this.cookie.delete('app_token');
   alert('Logout Successfully');
   this.router.navigate(['/login']);

  // this.$loggedIn.next(false);
  // console.log(this.$loggedIn);
  // // Redirect the user to the homepage
  // this.router.navigate(['/login']);
  // // Optionally, display a logout confirmation message
  // alert('Logout Successfully');
}


}
