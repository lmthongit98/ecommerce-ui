import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Category} from "../../../../models/category/category";
import {CategoryService} from "../../../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateCategoryDTO} from "../../../../dtos/category/update.category.dto";

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.scss'
})
export class CategoryUpdateComponent {
  categoryId: number;
  updatedCategory: Category;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.categoryId = 0;
    this.updatedCategory = {} as Category;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      debugger
      this.categoryId = Number(params.get('id'));
      this.getCategoryDetails();
    });

  }

  getCategoryDetails(): void {
    this.categoryService.getDetailCategory(this.categoryId).subscribe({
      next: (category: Category) => {
        this.updatedCategory = { ...category };
      },
      complete: () => {

      },
      error: (error: any) => {

      }
    });
  }
  updateCategory() {
    // Implement your update logic here
    const updateCategoryDTO: UpdateCategoryDTO = {
      name: this.updatedCategory.name,
    };
    this.categoryService.updateCategory(this.updatedCategory.id, updateCategoryDTO).subscribe({
      next: (response: any) => {
        debugger
      },
      complete: () => {
        debugger;
        this.router.navigate(['/admin/categories']);
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching categorys:', error);
      }
    });
  }
}
