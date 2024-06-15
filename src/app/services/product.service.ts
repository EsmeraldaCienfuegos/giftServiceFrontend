
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ProductsForSale } from '../models/ProductsForSale';
import { Product } from '../models/product';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = `${base_url}/products`
  private newChange = new Subject<Product[]>()

  private sortList(list: Product[]): Product[] {
    return list.sort((a, b) => a.idProduct - b.idProduct);
  }

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Product[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(product: Product) {
    return this.httpClient.post(this.url, product).pipe(
      tap(() => this.list().subscribe()));
  }
  delete(id: number) {  
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.httpClient.get<Product>(`${this.url}/${id}`);
  }
  update( product: Product) {
    return this.httpClient.put(`${this.url}/UpdateStock/${product.idProduct}`, product);
  }
  setList(newList: Product[]) {
    this.newChange.next(this.sortList(newList))
  }
  getList() {
    return this.newChange.asObservable();
  }

  listProductForSale() {
    return this.httpClient.get<ProductsForSale[]>(`${this.url}/productforsale`)
  }
}
