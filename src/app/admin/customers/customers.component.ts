import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customerList:any=[];
  ngOnInit(): void {
    this.getAllCustomers();
  }
  constructor(private productsrv : ProductService){}
   
  getAllCustomers(){
    this.productsrv.getAllUser().subscribe((res:any)=>{
      this.customerList=res;
      console.log(res);
    })
  }
}
