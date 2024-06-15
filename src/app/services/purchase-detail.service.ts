import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { PurchaseDetail } from '../models/PurchaseDetail';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailService {
  private url=`${base_url}/purchasedetails`
  private listaCambio=new Subject<PurchaseDetail[]>()
  constructor(private http:HttpClient) { }  

  list(){
    return this.http.get<PurchaseDetail[]>(this.url);
  }
  insert(pd:PurchaseDetail){
    return this.http.post(this.url,pd);
  }
  setList(listaNueva: PurchaseDetail[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<PurchaseDetail>(`${this.url}/${id}`);
  }
  update(pd:PurchaseDetail) { 
    return this.http.put(this.url, pd);
  }
}
