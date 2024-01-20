import {Injectable, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: Map<number, number> = new Map<number, number>(); // Dùng Map để lưu trữ giỏ hàng, key là id sản phẩm, value là số lượng
  localStorage?: Storage;

  private itemCount = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCount.asObservable();

  updateItemCount() {
    this.itemCount.next(this.getItemCount());
  }

  getItemCount() {
    let totalCount = 0;
    for (const quantity of this.cart.values()) {
      totalCount += quantity;
    }
    return totalCount;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
    // Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
    this.refreshCart()
  }

  public refreshCart() {
    const storedCart = this.localStorage?.getItem(this.getCartKey());
    if (storedCart) {
      this.cart = new Map(JSON.parse(storedCart));
    } else {
      this.cart = new Map<number, number>();
    }
    this.updateItemCount()
  }

  private getCartKey(): string {
    const userResponseJSON = this.localStorage?.getItem('user');
    const userResponse = JSON.parse(userResponseJSON!);
    debugger
    return `cart:${userResponse?.id ?? ''}`;

  }

  addToCart(productId: number, quantity: number = 1): void {
    if (this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      this.cart.set(productId, quantity);
    }
    this.saveCartToLocalStorage();
  }

  getCart(): Map<number, number> {
    return this.cart;
  }

  private saveCartToLocalStorage(): void {
    this.updateItemCount()
    this.localStorage?.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
  }

  setCart(cart: Map<number, number>) {
    this.cart = cart ?? new Map<number, number>();
    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cart.clear();
    this.saveCartToLocalStorage();
  }
}
