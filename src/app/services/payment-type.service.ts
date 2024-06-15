import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject, tap } from 'rxjs';
import { PaymentType } from '../models/PaymentType';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  private url = `${base_url}/paymenttypes`
  private listaCambio=new Subject<PaymentType[]>()
  
  private sortList(list: PaymentType[]): PaymentType[] {
    return list.sort((a, b) => a.idPayment_Type - b.idPayment_Type);
  }

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<PaymentType[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  create(p_type:PaymentType){
    return this.http.post<PaymentType>(this.url,p_type).pipe(
      tap(() => this.list().subscribe()));
  }
  setList(listaNueva: PaymentType[]) {
    this.listaCambio.next(this.sortList(listaNueva))
  }
  
  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<PaymentType>(`${this.url}/${id}`);
  }
  update(rt:PaymentType) { 
    return this.http.put(this.url, rt);
  }

}
