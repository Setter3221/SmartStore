import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  productList:any=[];
  constructor(private productsrv:ProductService,private route:ActivatedRoute){
  
  
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const searchString = String(params.get('searchString'));
      this.productsrv.searchProduct(searchString).subscribe((res: any) => {
        this.productList = res;
        console.log(res);
      })
    });
  }
 

}
