import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/components/home/home.component';
import {OrderComponent} from "./app/components/order/order.component";
import {ProductDetailComponent} from "./app/components/product-detail/product-detail.component";
import {OrderConfirmComponent} from "./app/components/order-confirm/order-confirm.component";

bootstrapApplication(OrderConfirmComponent, appConfig)
  .catch((err) => console.error(err));
