import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterModule,NavbarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
productList:any=[];
  constructor(private productsrv:ProductService){}
ngOnInit(): void {
  this.getAllProducts();
} 
getAllProducts(){
  this.productsrv.getAllProducts().subscribe((res:any)=>{
    this.productList=res;
    console.log(res)
  })
}

}
