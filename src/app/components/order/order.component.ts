import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {Product} from '../../models/product';
import {CartService} from '../../services/cart.service';
import {ProductService} from '../../services/product.service';
import {OrderService} from '../../services/order.service';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import {OrderDTO} from '../../dtos/order/order.dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {inject} from '@angular/core';
import {CouponService} from '../../services/coupon.service';
import {UserService} from "../../services/user.service";
import {Order} from "../../models/order";
import {
  StripeCardCvcComponent,
  StripeCardExpiryComponent,
  StripeCardGroupDirective,
  StripeCardNumberComponent,
  StripeService
} from "ngx-stripe";
import {switchMap} from "rxjs";
import {PaymentIntentDto} from "../../dtos/order/payment.intent.dto";
import {ToastrService} from "ngx-toastr";
import {CouponApplyDto} from "../../dtos/coupon/coupon.apply.dto";
import {CartItemDTO} from "../../dtos/order/cart.item.dto";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StripeCardCvcComponent,
    StripeCardExpiryComponent,
    StripeCardNumberComponent,
    StripeCardGroupDirective,
  ]
})
export class OrderComponent implements OnInit {
  private couponService = inject(CouponService);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  orderForm: FormGroup;
  cartItems: { product: Product, quantity: number }[] = [];
  totalAmount = 0;
  couponDiscount = 0;
  couponError = '';
  couponApplied = false;
  cart: Map<number, number> = new Map();
  orderData: OrderDTO = {
    user_id: 0,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    status: 'PENDING',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    coupon_code: '',
    cart_items: []
  };

  constructor(private stripeService: StripeService) {
    this.orderForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone_number: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      note: [''],
      couponCode: [''],
      shipping_method: ['express'],
      payment_method: ['cod']
    });
  }

  @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        backgroundColor: 'rgb(19, 23, 42)',
        color: 'white',
        fontWeight: '400',
        lineHeight: '1.5',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        padding: '.375rem .75rem',
        fontSize: '16px',
        '::placeholder': {
          color: '#817d7d',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };


  ngOnInit(): void {
    this.orderData.user_id = this.userService.getUserId() ?? 0;
    this.cart = this.cartService.getCart();
    const productIds = Array.from(this.cart.keys()); // Chuyển danh sách ID từ Map giỏ hàng

    if (productIds.length === 0) {
      return;
    }
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        this.cartItems = productIds.map((productId) => {
          const product = products.find((p) => p.id === productId);
          return {
            product: product!,
            quantity: this.cart.get(productId)!
          };
        });
      },
      complete: () => {
        this.calculateTotal()
      },
      error: (error: any) => {
        console.error('Error fetching detail:', error);
      }
    });
  }

  handleOrderSubmit() {
    if (this.orderForm.errors != null) {
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }
    this.orderData = {
      ...this.orderData,
      ...this.orderForm.value
    };
    this.orderData.cart_items = this.cartItems.map(cartItem => ({
      product_id: cartItem.product.id,
      quantity: cartItem.quantity
    }));
    this.orderData.total_money = this.totalAmount;
    switch (this.orderData.payment_method) {
      case 'credit_card':
        this.placeOrderWithCreditCard();
        break;
      case 'cod':
        this.placeOrder();
        break;
      default:
        throw new Error("Payment method is not valid!");
    }
  }

  private placeOrderWithCreditCard() {
    const paymentIntentDto: PaymentIntentDto = {
      amount: this.totalAmount,
      currency: 'USD',
      receiptEmail: this.orderData.email
    }
    this.orderService.createPaymentIntent(paymentIntentDto)
      .pipe(
        switchMap((pi) => {
            return this.stripeService.confirmCardPayment(pi.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.orderData.fullname,
                },
              },
            })
          }
        )
      )
      .subscribe((result) => {
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            this.placeOrder()
          }
        }
      });
  }

  private placeOrder() {
    this.orderService.placeOrder(this.orderData).subscribe({
      next: (response: Order) => {
        this.toastr.success('Đặt hàng thành công', 'Thông báo!');
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },
      complete: () => {
        this.calculateTotal();
      },
      error: (error: any) => {
        this.toastr.error(error.error.description, 'Lỗi đặt hàng!');
      },
    });
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updateCartFromCartItems();
      this.calculateTotal();
      this.resetCoupon();
    }
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.updateCartFromCartItems();
    this.calculateTotal();
    this.resetCoupon();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  confirmDelete(index: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.cartItems.splice(index, 1);
      this.updateCartFromCartItems();
      this.calculateTotal();
      this.resetCoupon();
    }
  }

  applyCoupon(): void {
    const couponCode = this.orderForm.get('couponCode')!.value;
    if (!this.couponApplied && couponCode) {
      const carItems: CartItemDTO[] = [];
      this.cart.forEach((value, key) => {
        carItems.push({
          product_id: key,
          quantity: value
        })
      })
      this.calculateTotal();
      const couponApplyDto: CouponApplyDto = {
        totalAmount: this.totalAmount,
        couponCode: couponCode,
        cartItems: carItems
      }
      this.couponService.calculateCouponValue(couponApplyDto)
        .subscribe({
          next: (res) => {
            const discountAmount = res.discountAmount
            this.couponDiscount = this.totalAmount - discountAmount;
            this.totalAmount = discountAmount;
            this.couponApplied = true;
            this.couponError = '';
          }, error: (err) => {
            this.couponError = err.error.description;
            console.log(err)
          }
        });
    }
  }

  private updateCartFromCartItems(): void {
    this.cart.clear();
    this.cartItems.forEach((item) => {
      this.cart.set(item.product.id, item.quantity);
    });
    this.cartService.setCart(this.cart);
  }

  private resetCoupon() {
    this.couponDiscount = 0;
    this.couponApplied = false;
    this.couponError = '';
  }
}
