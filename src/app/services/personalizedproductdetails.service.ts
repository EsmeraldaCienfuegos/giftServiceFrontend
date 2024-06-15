import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { PersonalizedProductDetail } from '../models/personalizedproductdetail';
import { HttpClient } from '@angular/common/http';


const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class PersonalizedproductdetailsService {

  private url = `${base_url}/personalizedproductdetails`;
  private listaCambio = new Subject<PersonalizedProductDetail[]>();
  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<PersonalizedProductDetail[]>(this.url);
  }
  insert(pd: PersonalizedProductDetail) {
    return this.httpClient.post(this.url, pd);
  }
  setList(listaNueva: PersonalizedProductDetail[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<PersonalizedProductDetail>(`${this.url}/${id}`);
  }
  update(pd: PersonalizedProductDetail) {
    return this.httpClient.put(this.url, pd);
  }
  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
