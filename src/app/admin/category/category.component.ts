import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule,CommonModule,NavbarComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoryList:any []=[];
  constructor(private productsrv:ProductService){}

  ngOnInit(): void {
   this.getCategory();
    console.log(this.categoryList);
  }
  getCategory(){
    this.productsrv.getAllCategory().subscribe((res:any)=>{
      this.categoryList=res;
    })
  }

}
