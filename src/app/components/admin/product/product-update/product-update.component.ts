import {Component} from '@angular/core';
import {Product} from "../../../../models/product";
import {Category} from "../../../../models/category";
import {ProductService} from "../../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../../services/category.service";
import {UpdateProductDTO} from "../../../../dtos/product/update.product.dto";
import {ProductImage} from "../../../../models/product.image";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss'
})
export class ProductUpdateComponent {

  productId: number;
  product: Product;
  updatedProduct: Product;
  categories: Category[] = []; // Dữ liệu động từ categoryService
  currentImageIndex: number = 0;
  images: File[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
  ) {
    this.productId = 0;
    this.product = {} as Product;
    this.updatedProduct = {} as Product;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      this.getProductDetails();
    });
    this.getCategories(1, 100);
  }

  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (categories: Category[]) => {
        debugger
        this.categories = categories;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  getProductDetails(): void {
    this.productService.getDetailProduct(this.productId).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.updatedProduct = {...product};
      },
      complete: () => {

      },
      error: (error: any) => {

      }
    });
  }

  updateProduct() {
    // Implement your update logic here
    const updateProductDTO: UpdateProductDTO = {
      name: this.updatedProduct.name,
      price: this.updatedProduct.price,
      description: this.updatedProduct.description,
      categoryId: this.updatedProduct.categoryId
    };
    this.productService.updateProduct(this.product.id, updateProductDTO).subscribe({
      next: (response: any) => {
        debugger
      },
      complete: () => {
        debugger;
        this.router.navigate(['/admin/products']);
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching products:', error);
      }
    });
  }

  showImage(index: number): void {
    debugger
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

  onFileChange(event: any) {
    // Retrieve selected files from input element
    const files = event.target.files;
    // Limit the number of selected files to 5
    if (files.length > 5) {
      alert('Please select a maximum of 5 images.');
      return;
    }
    // Store the selected files in the newProduct object
    this.images = files;
    this.productService.uploadImages(this.productId, this.images).subscribe({
      next: (imageResponse) => {
        debugger
        // Handle the uploaded images response if needed
        console.log('Images uploaded successfully:', imageResponse);
        this.images = [];
        // Reload product details to reflect the new images
        this.getProductDetails();
      },
      error: (error) => {
        // Handle the error while uploading images
        alert(error.error)
        console.error('Error uploading images:', error);
      }
    })
  }

  deleteImage(productImage: ProductImage) {
    if (confirm('Are you sure you want to remove this image?')) {
      // Call the removeImage() method to remove the image
      this.productService.deleteProductImage(productImage.productImageId).subscribe({
        next: (productImage: ProductImage) => {
          location.reload();
        },
        error: (error) => {
          // Handle the error while uploading images
          alert(error.error)
          console.error('Error deleting images:', error);
        }
      });
    }
  }

}
