import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
// import { OrderComponent } from './order/order.component';
//import { ProdutDetailsComponent } from './produt-details/produt-details.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './produt-details/produt-details.component';
import { ProductComponent } from './admin/product/product.component';
import { SearchComponent } from './search/search.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { AdminAuthGuard } from './AdminAuthGuard';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AuthGuard } from './AuthGuard';
// import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'navbar',component:NavbarComponent},
    {path:'',component:HomeComponent},
    {path:'cart',component:CartComponent},
    // {path:'order',component:OrderComponent},
    {path:'product-details/:productId',component:ProductDetailsComponent},
    {path:'products',component:ProductsComponent},
    {path:'product',component:ProductComponent},
    {path:'search/products/:searchString',component:SearchComponent},
    // {path:'**',component:ErrorComponent}
    {path:'admin/customer',component:CustomersComponent},
    {path:'order-items',component:OrderItemsComponent},
    {path:'admin/products',component:ProductComponent,
     canActivate:[AdminAuthGuard]},

     {path:'admin/profile',component:AdminProfileComponent,
     canActivate:[AdminAuthGuard]},
     
     {path:'admin/order',component:OrdersComponent,
     canActivate:[AdminAuthGuard]}
];
