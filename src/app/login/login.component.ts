import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  role:any;
loginObj: any= {
  email: '',
  password: ''
};
constructor(private router: Router,private productsrv:ProductService,private cookie:CookieService,private authsrv: AuthService){}
  
onLogin(){
  const USER_KEY='app_token';
  this.productsrv.getLoginUser(this.loginObj).subscribe((res:any)=>{

    if(res!=null){
    alert('Login Successfully')
    this.cookie.set(USER_KEY, res.token);
    this.role=this.authsrv.getUserRole();
    console.log(this.role);
    if(this.role=='Admin'){
      this.router.navigate(['admin/profile']);
    }else{

      this.router.navigate(['/']);
    }
  }
  else{

    alert("check your Credential!");
  }

  })
}


}

