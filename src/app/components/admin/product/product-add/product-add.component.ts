import {Component} from '@angular/core';
import {Category} from "../../../../models/category";
import {InsertProductDTO} from "../../../../dtos/product/insert.product.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../../services/category.service";
import {ProductService} from "../../../../services/product.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {
  insertProductDTO: InsertProductDTO = {
    name: '',
    price: 0,
    description: '',
    categoryId: 1,
    images: []
  };
  categories: Category[] = []; // Dữ liệu động từ categoryService
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {

  }

  ngOnInit() {
    this.getCategories(1, 100)
  }

  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
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
    this.insertProductDTO.images = files;
  }

  insertProduct() {
    this.productService.insertProduct(this.insertProductDTO).subscribe({
      next: (response) => {
        if (this.insertProductDTO.images.length > 0) {
          const productId = response.id; // Assuming the response contains the newly created product's ID
          this.productService.uploadImages(productId, this.insertProductDTO.images).subscribe({
            next: (imageResponse) => {
              console.log('Images uploaded successfully:', imageResponse);
              this.router.navigate(['../'], {relativeTo: this.route});
            },
            error: (error) => {
              console.error('Error uploading images:', error);
            }
          })
        }
      },
      error: (error) => {
        console.error('Error inserting product:', error);
      }
    });
  }
}
