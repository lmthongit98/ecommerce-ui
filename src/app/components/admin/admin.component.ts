import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {UserResponse} from '../../responses/user/user.response';
import {RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';
import {StorageService} from "../../services/storage.service";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.scss',
  ],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    //FormsModule
  ],


})
export class AdminComponent implements OnInit {
  //adminComponent: string = 'orders';
  userResponse?: UserResponse | null;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.router.url === '/admin') {
      this.router.navigate(['/admin/orders']);
    }
  }

  logout() {
    this.userService.removeUserFromLocalStorage();
    this.storageService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.router.navigate(['/']);
  }

  showAdminComponent(componentName: string): void {
    if (componentName === 'orders') {
      this.router.navigate(['/admin/orders']);
    } else if (componentName === 'categories') {
      this.router.navigate(['/admin/categories']);
    } else if (componentName === 'products') {
      this.router.navigate(['/admin/products']);
    } else if (componentName === 'products') {
      this.router.navigate(['/admin/coupons']);
    } else if (componentName === 'roles') {
      this.router.navigate(['/admin/roles']);
    }
  }
}
