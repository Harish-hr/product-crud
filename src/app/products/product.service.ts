import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { of, Observable, tap, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';
 
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product | undefined> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Product>(url).pipe(
          catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  addProduct(product: Product): Observable<Product> { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post<Product>(this.apiUrl, product, httpOptions).pipe(
      tap(response => console.log('Response:', response)),
      catchError(this.handleError<Product>('addProduct')));
  }

  updateProduct(product: Product, id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Product>(url, product).pipe(
      tap((product) => {
        console.log('Product updated successfully:', product);
      }),
      catchError((error) => {
        console.error('Error updating product:', error);
        return this.handleError<Product>('updateProduct')(error); 
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return (error);
    };
  }
}
