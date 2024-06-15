import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { City } from '../models/city';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private url = `${base_url}/cities`;

  private listaCambio = new Subject<City[]>()
  private sortList(list: City[]): City[] {
    return list.sort((a, b) => a.idCity- b.idCity);
  }
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<City[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(i: City) {
    return this.http.post(this.url, i).pipe(
      tap(() => this.list().subscribe()));
  }

  setList(listaNueva: City[]) {
    this.listaCambio.next(this.sortList(listaNueva));
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<City>(`${this.url}/${id}`);
  }
  update(rt:City) { 
    return this.http.put(this.url, rt);
  }
}
