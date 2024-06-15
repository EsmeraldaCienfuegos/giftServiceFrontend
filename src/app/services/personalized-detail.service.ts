import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { PersonalizedDetail } from '../models/personalizeddetail';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PersonalizedDetailService {
  private url = `${base_url}/personalizeddetails`;
  private listaCambio = new Subject<PersonalizedDetail[]>();
  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<PersonalizedDetail[]>(this.url);
  }
  insert(pd: PersonalizedDetail) {
    return this.httpClient.post(this.url, pd);
  }
  setList(listaNueva: PersonalizedDetail[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<PersonalizedDetail>(`${this.url}/${id}`);
  }
  update(pd: PersonalizedDetail) {
    return this.httpClient.put(this.url, pd);
  }
  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
