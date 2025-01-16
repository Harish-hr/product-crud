import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service'; 
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule,FormsModule,RouterModule]
})
  
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  sortField: string | null = null;     

  pageSize = 5;
  currentPage = 1;
  totalPages: number=0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;
      this.calculateTotalPages();
    });
  }

  get displayedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredProducts.slice(start, end);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onSearchChange(): void {
    if (this.searchTerm) {
      // Filter products based on the search term
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // If the search term is empty, show all products
      this.filteredProducts = this.products;
    }
  }

  sortBy(field: string) {
    if (this.sortField === field) {
      // Reverse sort direction if the same field is clicked again
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Sort in ascending order initially
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    // Use a sorting function
    this.filteredProducts.sort((a, b) => {
      const aValue = a[field as keyof Product];
      const bValue = b[field as keyof Product];

      const comparison = typeof aValue === 'string'
          ? aValue.localeCompare(bValue as string)
          : (aValue as number) - (bValue as number);

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
}
}
