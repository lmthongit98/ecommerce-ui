import {AdminComponent} from "./admin.component";
import {Routes} from "@angular/router";
import {ProductAdminComponent} from "./product/product-admin.component";
import {ProductAddComponent} from "./product/product-add/product-add.component";

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'products',
        component: ProductAdminComponent
      },
      {
        path: 'products/insert',
        component: ProductAddComponent
      },
    ]
  }
];
