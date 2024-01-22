import {AdminComponent} from "./admin.component";
import {Routes} from "@angular/router";
import {ProductAdminComponent} from "./product/product-admin.component";
import {ProductAddComponent} from "./product/product-add/product-add.component";
import {ProductUpdateComponent} from "./product/product-update/product-update.component";
import {OrderAdminComponent} from "./order/order.admin.component";
import {OrderDetailAdminComponent} from "./order-detail/order-detail-admin.component";
import {CategoryAdminComponent} from "./category/category-admin.component";
import {CategoryUpdateComponent} from "./category/update/category-update.component";
import {CategoryCreateComponent} from "./category/create/category-create.component";
import {CouponAdminComponent} from "./coupon/coupon-admin.component";
import {CouponUpdateComponent} from "./coupon/coupon-update/coupon-update.component";
import {CouponCreateComponent} from "./coupon/coupon-create/coupon-create.component";

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
        path: 'orders/:id',
        component: OrderDetailAdminComponent
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
      {
        path: 'categories',
        component: CategoryAdminComponent
      },
      {
        path: 'categories/update/:id',
        component: CategoryUpdateComponent
      },
      {
        path: 'categories/create',
        component: CategoryCreateComponent
      },
      {
        path: 'coupons',
        component: CouponAdminComponent
      },
      {
        path: 'coupons/update/:id',
        component: CouponUpdateComponent
      },
      {
        path: 'coupons/create',
        component: CouponCreateComponent
      },
    ]
  }
];
