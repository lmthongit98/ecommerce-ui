import {Component, Inject} from '@angular/core';
import {CommonModule, DOCUMENT} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {OrderResponse} from "../../../responses/order/order.response";
import {Router} from "@angular/router";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-order-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './order.admin.component.html',
  styleUrl: './order.admin.component.scss'
})
export class OrderAdminComponent {
  orders: OrderResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  keyword: string = "";
  visiblePages: number[] = [];
  localStorage?: Storage;

  constructor(
    private orderService: OrderService,
    private router: Router,
    @Inject(DOCUMENT) document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }

  ngOnInit(): void {
    debugger
    this.currentPage = Number(this.localStorage?.getItem('currentOrderAdminPage')) || 0;
    this.getAllOrders(this.keyword, this.currentPage, this.itemsPerPage);
  }

  searchOrders() {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    //Mediocre Iron Wallet
    debugger
    this.getAllOrders(this.keyword.trim(), this.currentPage, this.itemsPerPage);
  }

  getAllOrders(keyword: string, page: number, limit: number) {
    debugger
    this.orderService.getAllOrders(keyword, page, limit).subscribe({
      next: (response: any) => {
        debugger
        this.orders = response.content;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching products:', error);
      }
    });
  }

  onPageChange(page: number) {
    debugger;
    this.currentPage = page < 0 ? 0 : page;
    this.localStorage?.setItem('currentOrderAdminPage', String(this.currentPage));
    this.getAllOrders(this.keyword, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0)
      .map((_, index) => startPage + index);
  }

  deleteOrder(id: number) {
    const confirmation = window
      .confirm('Are you sure you want to delete this order?');
    if (confirmation) {
      debugger
      this.orderService.deleteOrder(id).subscribe({
        next: (response: any) => {
          debugger
          location.reload();
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching products:', error);
        }
      });
    }
  }

  viewDetails(order: OrderResponse) {
    debugger
    this.router.navigate(['/admin/orders', order.id]);
  }
}
