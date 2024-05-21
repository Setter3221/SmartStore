import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminAuthGuard } from './AdminAuthGuard';

@Component({

  selector: 'app-root',
  standalone: true,
  
  imports:[RouterOutlet,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {

  title = 'Project';
  
}
