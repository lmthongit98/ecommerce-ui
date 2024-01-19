import {AdminComponent} from "./admin.component";
import {Routes} from "@angular/router";
import {ProductAdminComponent} from "./product/product-admin.component";
import {ProductAddComponent} from "./product/product-add/product-add.component";
import {ProductUpdateComponent} from "./product/product-update/product-update.component";
import {OrderAdminComponent} from "./order/order.admin.component";

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: OrderAdminComponent
      },
      {
        path: 'products',
        component: ProductAdminComponent
      },
      {
        path: 'products/insert',
        component: ProductAddComponent
      },
      {
        path: 'products/update/:id',
        component: ProductUpdateComponent
      },
    ]
  }
];
