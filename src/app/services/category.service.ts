import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject, tap } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url= environment.base + '/categories';
  private listCategory = new Subject<Category[]>();

  private sortList(list: Category[]): Category[] {
    return list.sort((a, b) => a.id - b.id);
  }

  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Category[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(category: Category){
    return this.http.post(this.url, category).pipe(
      tap(() => this.list().subscribe()));
  }
  update(category: Category){
    return this.http.put(this.url, category);
  }
  delete(id: number){
    return this.http.delete(this.url + '/' + id);
  }
  listId(id: number){
    return this.http.get<Category>(this.url + '/' + id);
  }
  
  getAll(){
    return this.listCategory.asObservable();
  }
  setList(list: Category[]){
    this.listCategory.next(this.sortList(list));
  }


}
