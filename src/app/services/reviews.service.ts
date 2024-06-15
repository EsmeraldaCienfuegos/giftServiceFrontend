import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reviews } from '../models/reviews';
import { environment } from '../../environments/environment';
import { Subject, tap } from 'rxjs';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private url = `${base_url}/reviews`
  private newChange = new Subject<Reviews[]>()
  constructor(private httpClient: HttpClient) { }

  private sortList(list: Reviews[]): Reviews[] {
    return list.sort((a, b) => a.idReviews - b.idReviews);
  }

  list() {
    return this.httpClient.get<Reviews[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(r: Reviews) {
    return this.httpClient.post(this.url, r).pipe(
      tap(() => this.list().subscribe()));
  }
  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.httpClient.get<Reviews>(`${this.url}/${id}`);
  }
  update( p: Reviews) {
    return this.httpClient.put(`${this.url}/${p.idReviews}`, p);
  }

  setList(newList: Reviews[]) {
    this.newChange.next(this.sortList(newList))
  }
  getList() {
    return this.newChange.asObservable();
  }


}
