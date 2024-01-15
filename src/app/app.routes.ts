import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {OrderComponent} from "./components/order/order.component";
import {DetailProductComponent} from "./components/product-detail/product-detail.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/:id', component: DetailProductComponent },
  // { path: 'orders', component: OrderComponent,canActivate:[AuthGuardFn] },
  // { path: 'user-profile', component: UserProfileComponent, canActivate:[AuthGuardFn] },
  // { path: 'orders/:id', component: OrderDetailComponent },
];
