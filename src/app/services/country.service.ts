import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { Country } from '../models/country';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url = `${base_url}/countries`;

  private listaCambio = new Subject<Country[]>()
  private sortList(list: Country[]): Country[] {
    return list.sort((a, b) => a.idCountry - b.idCountry);
  }
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Country[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(i: Country) {
    return this.http.post(this.url, i).pipe(
      tap(() => this.list().subscribe()));
  }

  setList(listaNueva: Country[]) {
    this.listaCambio.next(this.sortList(listaNueva));
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Country>(`${this.url}/${id}`);
  }
  update(rt:Country) { 
    return this.http.put(this.url, rt);
  }

}
