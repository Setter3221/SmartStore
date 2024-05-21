import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
 
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})

export class OrdersComponent {
  ordersList:{[key:string]:any}=[];
  ngOnInit(): void {
    this.getAllOrder();
  }
  constructor(private productsrv : ProductService){}
   
  getAllOrder(){
    this.productsrv.getAllOrders().subscribe((res:any)=>{
      this.ordersList=res;
      let groupedOrders=res.reduce((r:any,a:any)=>{
        r[a.orderId] = r[a.orderId] || {orders: [], total: 0};
        r[a.orderId].orders.push(a);
        r[a.orderId].total += a.totalAmount;
       
        return r;
      },{});
      console.log(groupedOrders);
      this.ordersList=groupedOrders;
    })
  }

  getProductIds(order: any): string {
    return order.orders.map((product: { productId: any; }) => product.productId).join(', ');
  }
 
}
 