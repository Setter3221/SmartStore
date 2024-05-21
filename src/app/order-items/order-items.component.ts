import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent {
  groupedOrders:{[Key:string]:any}=[];
  constructor(private productsrv:ProductService){}
 
  ngOnInit(): void {
    this.getMyOrders();
   }
 
  getMyOrders(){
    this.productsrv.getMyOrders().subscribe((res:any)=>{
      console.log(res);
      let groupedOrders=res.reduce((r:any,a:any)=>{
        r[a.orderId]=[...r[a.orderId] || [] ,a];
       
        return r;
      },{});
      console.log(groupedOrders);
      this.groupedOrders=groupedOrders;
    })
  }
}
