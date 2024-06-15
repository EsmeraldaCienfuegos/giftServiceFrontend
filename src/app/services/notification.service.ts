import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { Notification } from '../models/Notification';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = `${base_url}/notifications`;

  private listaCambio = new Subject<Notification[]>()
  private sortList(list: Notification[]): Notification[] {
    return list.sort((a, b) => a.idNotification- b.idNotification);
  }
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Notification[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(i: Notification) {
    return this.http.post(this.url, i).pipe(
      tap(() => this.list().subscribe()));
  }

  setList(listaNueva: Notification[]) {
    this.listaCambio.next(this.sortList(listaNueva));
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Notification>(`${this.url}/${id}`);
  }
  update(rt:Notification) { 
    return this.http.put(this.url, rt);
  }
}
