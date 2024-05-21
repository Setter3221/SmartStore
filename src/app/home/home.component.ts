import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../services/product.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,RouterModule,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private productsrv:ProductService,private router:Router){}
 
  categoryList:any []=[];

  ngOnInit(): void {

  this.getAllCategory();
 }
 getAllCategory(){
   this.productsrv.getAllCategory().subscribe((res:any)=>{

     this.categoryList=res;
     console.log(res)
   })
 }

 products(){

  this.router.navigate(['/products']);
}

}
