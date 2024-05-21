// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from './constant/constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authsrv: AuthService) { }

  getAllProducts() {
    const myToken = this.authsrv.getToken();
    console.log(myToken);
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });

    const requestOptions = { headers: header };

    return this.http.get<any>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCTS, requestOptions);
  }
  getAllCategory() {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY);
  }
  getLoginUser(obj: any) {

    return this.http.post(Constant.API_END_POINT + Constant.METHODS.LOGIN_USER, obj);
  }
  registerUser(obj: any) {
    console.log(obj);
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.REGISTER_USER, obj);
  }
  onSave(obj: any) {
    const myToken = this.authsrv.getToken();
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });

    const requestOptions = { headers: header };
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.CREATE_PRODUCT, obj,requestOptions);
  }
  getProductById(obj: any) {
    return this.http.get(Constant.API_END_POINT + `Products/${obj}`);
  }

  getAllCartItems() {
    const myToken = this.authsrv.getToken();
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });

    const requestOptions = { headers: header };
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CART_ITEMS, requestOptions);
  }


  updateItemQuantity(productId: Number, quantity: Number) {
    
    const myToken = this.authsrv.getToken();
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });

    const requestOptions = { headers: header };

    return this.http.put(Constant.API_END_POINT + Constant.METHODS.UPDATE_ITEM_QUANTITY + `?productId=${productId}&quantity=${quantity}`, {}, requestOptions);
  }

  onRemoveItem(obj: any) {
    const myToken = this.authsrv.getToken();

    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });
    const requestOptions = { headers: header };
    return this.http.delete(Constant.API_END_POINT + Constant.METHODS.REMOVE_ITEM + `?productId=${obj}`, { headers: header, observe: 'response' })
      
  }
  onAddToCart(obj: any) {
    const myToken = this.authsrv.getToken();
    console.log("token => "+myToken);
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });
    console.log("header => "+header);
    //  return this.http.get(Constant.API_END_POINT+Constant.METHODS.ADD_TO_CART,obj,header);
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.ADD_TO_CART + `?productId=${obj}`, {}, { headers: header });
  }

  onAddOrder() {
    const myToken = this.authsrv.getToken();

    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });
   return this.http.post(Constant.API_END_POINT + Constant.METHODS.ADD_ORDER,{}, { headers: header,observe:'response' });
  }

  onEmptyCart(){
    const myToken = this.authsrv.getToken();
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });
   return  this.http.delete(Constant.API_END_POINT + Constant.METHODS.EMPTY_CART, { headers: header, observe: 'response' })
     
  }

  onAddOrderItems(orderId:any){
    console.log(orderId);
    const myToken = this.authsrv.getToken();
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });
    console.log("inside add order items");
   return this.http.post(Constant.API_END_POINT + Constant.METHODS.ADD_ORDER_ITEMS+`?orderId=${orderId}`,{}, { headers: header })
   
  }
  updateProduct(productId: Number, obj: any) {
   
    const myToken = this.authsrv.getToken();
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });
    return this.http.put(Constant.API_END_POINT + Constant.METHODS.UPDATE_PRODUCT + `/${productId}`, obj,{ headers: header });
  }
 
  deleteProduct(productId: any) {
    const myToken = this.authsrv.getToken();
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });
    return this.http.delete(Constant.API_END_POINT + Constant.METHODS.DELETE_PRODUCT + `/${productId}`, {headers: header, observe: 'response' })
      .subscribe((res: any) => {
        alert("Product deleted");
      })
     
  }
  getAllUser(){
    const myToken = this.authsrv.getToken();
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });
    return this.http.get<any>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_USERS,{ headers: header});
  }
  searchProduct(searchString:string){
    console.log(searchString);
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.DELETE_PRODUCT + `/search/${searchString}`);
  }

  getMyOrders(){
    const myToken = this.authsrv.getToken();
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });
    return this.http.get<any>(Constant.API_END_POINT+Constant.METHODS.GET_MY_ORDERS,{ headers: header});
  }

  getAllOrders()
  {
    const myToken = this.authsrv.getToken();
    let header = new HttpHeaders({ 'Authorization': "Bearer " + myToken });
    return this.http.get<any>(Constant.API_END_POINT + Constant.METHODS.GET_ALL_ORDERS,{ headers: header});
 
  }




}
