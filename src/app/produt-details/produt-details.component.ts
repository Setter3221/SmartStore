import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-produt-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './produt-details.component.html',
  styleUrl: './produt-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product:any;
  constructor(private route:ActivatedRoute,private productsrv:ProductService,private router:Router,private auth:AuthService){}
   ngOnInit(): void {
    const routeParams=this.route.snapshot.paramMap;
    const productId=Number(routeParams.get('productId'));
    this.getProductById(productId);
   
  }

  // onAddToCart(ItemId:string){
  //   console.log(ItemId);
  //   if(this.auth.isLoggedIn()){
  //    this.productsrv.onAddToCart(ItemId).subscribe((res:any)=>{
  //     if(res.stock>=1){

      
  //     alert("product added to cart");
  //     this.router.navigate(['/cart']);
  //     }
  //     else{

  //       alert("item not available");
  //     }
  //    })
     
     
     
  //   }else{
  //     alert("Please login ...");
  //     this.router.navigate(['/login']);
  //   }
   
    
  // }

  onAddToCart(ItemId:string){
    console.log(ItemId);
    if(this.auth.isLoggedIn()){
      this.productsrv.getProductById(ItemId).subscribe((res:any)=>{
        if(res.stock >= 1){
          this.productsrv.onAddToCart(ItemId).subscribe((res:any)=>{
            alert("product added to cart");
            this.router.navigate(['/cart']);
          })
        } else {
          alert("Item not available");
        }
      })
    }
    else{
      alert("Please login ...");
      this.router.navigate(['/login']);
    }
  }

  getProductById(productId:any){
   this.productsrv.getProductById(productId).subscribe((res:any)=>{
    
      this.product=res;
   });

  }
}

