import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private route:Router,private productsrv:ProductService){}

  cartItems:any=[];
  quantityOfProduct:any;

  async ngOnInit(): Promise<void> {

    await this.getAllCartItems();
    this.cartItemsSummary();
    
  }

  getAllCartItems(): Promise<any> {

    return new Promise((resolve) => {
      this.productsrv.getAllCartItems().subscribe((res:any)=>{
        this.cartItems=res;
        console.log(res);
        this.AssignProduct();
        resolve(res);
      }
      )
    });
  }

  AssignProduct(){
    this.cartItems.forEach((cartItem: any)=> {
      this.productsrv.getProductById(cartItem.productId).subscribe((res:any)=>{
        cartItem.productDetails=res;
      },
      (error:any)=>{
        alert("Error fetching product details : "+error);
      })
      
    });
  }
  
orderId:any

 async onCheckOut(){
    
    this.productsrv.onAddOrder().subscribe((res:any)=>{
      this.orderId=res.body.result.orderId;
      console.log(res.body.result);
      this.onAddOrderItems(this.orderId);
    })
  }
  
  onAddOrderItems(orderId:any){
    this.productsrv.onAddOrderItems(orderId).subscribe((res:any)=>{
      alert("Order Confirmed");
      this.onEmptyCart();
      location.reload();
      this.route.navigate(['/order-items']);
    })
  }
 
  onEmptyCart(){
    this.productsrv.onEmptyCart().subscribe((res:any)=>{
      alert("Cart Empty successfully");
      location.reload();
    })  
   
  }
  async onRemoveItem(productId:any){
    this.productsrv.onRemoveItem(productId).subscribe(async (res:any)=>
    {
 
      alert("Item deleted successfully");
      await this.getAllCartItems();
      this.cartItemsSummary();
    })
  }
  onDecrementQuantity(productId:any){
    let item=this.cartItems.find((item:any)=>item.productId==productId);
    if(item && item.quantity>0){
      item.quantity=item.quantity-1;
      
      if(item.quantity<=0){
        this.cartItems = this.cartItems.filter((it:any)=>it.productId!=item.productId);
       
        return;
      }
      
      this.productsrv.updateItemQuantity(productId,item.quantity).subscribe((res:any)=>{
        this.cartItemsSummary();
      })
      
    }
  }


  onIncrementQuantity(productId: number) {
    let item = this.cartItems.find((item: any) => item.productId == productId);
    if (item) {
      this.productsrv.getProductById(productId).subscribe((product: any) => {
        if (item.quantity < product.stock) {
          item.quantity = item.quantity + 1;
          this.productsrv.updateItemQuantity(productId, item.quantity).subscribe((res: any) => {
            this.cartItemsSummary();
          });
        } else {
          // Display a message to the user that the product is out of stock
          console.log("Product is out of stock");
        }
      });
    }
  }





totalAmount:any;
  cartItemsSummary(){
    let totalprice=0;
    this.cartItems.forEach((cartItem: any)=> {
      
      let itemTotal=cartItem.quantity*cartItem.unitPrice;
      // console.log(itemTotal);
       totalprice=totalprice+itemTotal;
    })
    this.totalAmount=totalprice;
  }
  
  
}


