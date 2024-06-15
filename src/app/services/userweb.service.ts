import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { UserWeb } from '../models/UserWeb';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UserwebService {
  private url = `${base_url}/users`;

  private listaCambio = new Subject<UserWeb[]>()
  private sortList(list: UserWeb[]): UserWeb[] {
    return list.sort((a, b) => a.idUser- b.idUser);
  }
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<UserWeb[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(i: UserWeb) {
    return this.http.post(this.url, i).pipe(
      tap(() => this.list().subscribe()));
  }

  setList(listaNueva: UserWeb[]) {
    this.listaCambio.next(this.sortList(listaNueva));
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<UserWeb>(`${this.url}/${id}`);
  }
  update(rt:UserWeb) { 
    return this.http.put(this.url, rt);
  }
}
