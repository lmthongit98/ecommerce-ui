import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Product} from '../../models/product/product';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {CommonModule} from '@angular/common';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-detail-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
  ]
})

export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  isPressedAddToCart: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    // Lấy productId từ URL
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    //this.cartService.clearCart();
    //const idParam = 9 //fake tạm 1 giá trị
    if (idParam !== null) {
      this.productId = +idParam;
    }
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          this.product = response
          // Bắt đầu với ảnh đầu tiên
          this.showImage(0);
        },
        error: (error: any) => {
          console.error('Error fetching detail:', error);
        }
      });
    } else {
      console.error('Invalid productId:', idParam);
    }
  }

  showImage(index: number): void {
    if (this.product && this.product.productImages &&
      this.product.productImages.length > 0) {
      // Đảm bảo index nằm trong khoảng hợp lệ
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.productImages.length) {
        index = this.product.productImages.length - 1;
      }
      // Gán index hiện tại và cập nhật ảnh hiển thị
      this.currentImageIndex = index;
    }
  }

  thumbnailClick(index: number) {
    debugger
    // Gọi khi một thumbnail được bấm
    this.currentImageIndex = index; // Cập nhật currentImageIndex
  }

  nextImage(): void {
    debugger
    this.showImage(this.currentImageIndex + 1);
  }

  previousImage(): void {
    debugger
    this.showImage(this.currentImageIndex - 1);
  }

  addToCart(): void {
    debugger
    this.isPressedAddToCart = true;
    if (this.product) {
      this.toastr.success('Thêm sản phẩm vào giỏ hàng thành công!', 'Thông báo!', {timeOut: 1000});
      this.cartService.addToCart(this.product.id, this.quantity);
    } else {
      this.toastr.error('Thất bại!', 'Thông báo!');
    }
  }

  increaseQuantity(): void {
    debugger
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getTotalPrice(): number {
    if (this.product) {
      return this.product.price * this.quantity;
    }
    return 0;
  }

  buyNow(): void {
    if (this.isPressedAddToCart == false) {
      this.addToCart();
    }
    this.router.navigate(['/orders']);
  }
}
