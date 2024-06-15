import { Injectable } from '@angular/core'; 
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Subject, tap } from 'rxjs';
import { ProductImageDetail } from '../models/ProductImageDetail';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ProductImageDetailService {
  private url = `${base_url}/productimagedetails`
  private newChange = new Subject<ProductImageDetail[]>()
  private sortList(list: ProductImageDetail[]): ProductImageDetail[] {
    return list.sort((a, b) => a.idProductImageDetail - b.idProductImageDetail);
  }
  
  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<ProductImageDetail[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(product: ProductImageDetail) {
    return this.httpClient.post(this.url, product)
  }
  delete(id: number) {  
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  listImageByProductId(idProduct: number) {
    return this.httpClient.get<ProductImageDetail[]>(`${this.url}/images/${idProduct}`);
  }
  listId(id: number) {
    return this.httpClient.get<ProductImageDetail>(`${this.url}/${id}`);
  }
  update( product: ProductImageDetail) {
    return this.httpClient.put(`${this.url}`, product);
  }
  setList(newList: ProductImageDetail[]) {
    this.newChange.next(this.sortList(newList))
  }
  getList() {
    return this.newChange.asObservable();
  }
  
}
