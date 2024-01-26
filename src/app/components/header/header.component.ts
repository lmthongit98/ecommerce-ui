import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';

import { Router } from '@angular/router';
import { UserResponse } from '../../responses/user/user.response';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import {StorageService} from "../../services/storage.service";
import {CartService} from "../../services/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userResponse?:UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;
  itemCount = 0;
  itemCountSub!: Subscription;


  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
    private cartService: CartService
  ) {

  }
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.itemCountSub = this.cartService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    if(index === 0) {
      this.router.navigate(['/user-profile']);
    } else if (index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.storageService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item
  }


  setActiveNavItem(index: number) {
    this.activeNavItem = index;
  }

  ngOnDestroy(): void {
    this.itemCountSub.unsubscribe();
  }
}
