import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers:[DatePipe]
})
export class ProductComponent implements OnInit {
  isSidePanelVisible:boolean=false;
  

  productObj: any={
    "productId": 0,
    "productName": "",
    "description": "",
    "price": 0,
    "stock": 0,
    "categoryId": 0,
    // "status": 0,
    "dateTime":"",
    "image_Url": ""
  };
  categoryList: any []=[];
  productList:any []=[];

constructor(private productSrv:ProductService,datePipe: DatePipe){

}
ngOnInit(): void{
this.getAllCategory();
this.getAllProducts();
}
getAllProducts(){
  this.productSrv.getAllProducts().subscribe((res:any)=>{
    this.productList=res;
  })
}

getAllCategory(){
  this.productSrv.getAllCategory().subscribe((res:any)=>{
    this.categoryList=res;
  })
}

openSidePanel(){
  this.isSidePanelVisible=true;
}

closeSidePanel(){
  this.isSidePanelVisible=false;
}

onSubmit(){
  this.productSrv.onSave(this.productObj).subscribe((res:any)=>{
    alert("Product added successfully");
    this.isSidePanelVisible=false;
    this.getAllProducts();
  })
}

onEdit(product:any){
    this.productObj=product;
    this.openSidePanel();
  }
  onUpdate(){
    this.productSrv.updateProduct(this.productObj.productId,this.productObj).subscribe((res:any)=>{
      alert("Product updated successfully");
      this.isSidePanelVisible=false;
      this.getAllProducts();
    })
  }

onDelete(productId:any){
    this.productSrv.deleteProduct(productId);
    this.getAllProducts();
  }


 }


