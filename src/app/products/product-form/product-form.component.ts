import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [FormsModule],
})
export class ProductFormComponent{
  product: Product = {
    id: 0, name: '', price: 0, description: '',
    type: '',
    picture: ''
  };
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProductById(+id).subscribe((data) => {
        if (data) this.product = data;
      });
    }
  }

  saveProduct(): void {
    console.log("Before calling addProduct:", this.product);

    if (this.isEditMode) {
      this.productService.updateProduct(this.product, this.product.id).subscribe({
        next: (updatedProduct) => {
          console.log('Product Updated:', updatedProduct);
          this.router.navigate(['/products']);
      },
        error: (error) => {
           console.error('Error Updating product:', error);
      },
      complete: () => console.log('Update product request complete')
     });
    } else {
      this.productService.addProduct(this.product).subscribe({
        next: (createdProduct) => {
            console.log('Product added:', createdProduct);
            this.router.navigate(['/products']);
        },
        error: (error) => {
            console.error('Error adding product:', error);
        },
        complete: () => console.log('Add product request complete')
       });
    }
  }
}