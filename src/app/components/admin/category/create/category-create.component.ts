import { Component } from '@angular/core';
import {InsertCategoryDTO} from "../../../../dtos/category/insert.category.dto";
import {Category} from "../../../../models/category/category";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../../services/category.service";
import {ProductService} from "../../../../services/product.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent {
  insertCategoryDTO: InsertCategoryDTO = {
    name: '',
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

  }

  insertCategory() {
    this.categoryService.insertCategory(this.insertCategoryDTO).subscribe({
      next: (response) => {
        debugger
        this.router.navigate(['/admin/categories']);
      },
      error: (error) => {
        debugger
        // Handle error while inserting the category
        alert(error.error)
        console.error('Error inserting category:', error);
      }
    });
  }
}
