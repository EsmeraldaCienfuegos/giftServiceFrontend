import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { DeliveryType } from '../models/DeliveryType';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class DeliveryTypeService {
  private url = `${base_url}/deliverytypes`;
  private listaCambio = new Subject<DeliveryType[]>()

  
  private sortList(list: DeliveryType[]): DeliveryType[] {
    return list.sort((a, b) => a.idDeliveryType - b.idDeliveryType);
  }

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<DeliveryType[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(dt: DeliveryType) {
    return this.http.post(this.url, dt).pipe(
      tap(() => this.list().subscribe()));
  }

  setList(listaNueva: DeliveryType[]) {
    this.listaCambio.next(this.sortList(listaNueva));
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<DeliveryType>(`${this.url}/${id}`);
  }
  update(delivery:DeliveryType) { 
    return this.http.put(`${this.url}/${delivery.idDeliveryType}`, delivery);
  }

}
