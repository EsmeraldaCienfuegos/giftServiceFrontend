import { Injectable } from '@angular/core';
import { Purchase } from '../models/Purchase';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private url=`${base_url}/purchases`
  private listaCambio=new Subject<Purchase[]>()
  constructor(private http:HttpClient) { }  

  list(){
    return this.http.get<Purchase[]>(this.url);
  }
  insert(p:Purchase){
    return this.http.post(this.url,p);
  }
  setList(listaNueva: Purchase[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Purchase>(`${this.url}/${id}`);
  }
  update(pd:Purchase) { 
    return this.http.put(this.url, pd);
  }
}