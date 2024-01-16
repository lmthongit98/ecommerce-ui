import {AdminComponent} from "./admin.component";
import {Routes} from "@angular/router";
import {ProductAdminComponent} from "./product/product-admin.component";

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'products',
        component: ProductAdminComponent
      }
    ]
  }
];
