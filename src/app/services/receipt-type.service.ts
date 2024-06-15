import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject, tap } from 'rxjs';
import { ReceiptType } from '../models/ReceiptType';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class ReceiptTypeService {

  private url = `${base_url}/receipttypes`
  private listChange = new Subject<ReceiptType[]>()

  private sortList(list: ReceiptType[]): ReceiptType[] {
    return list.sort((a, b) => a.idReceipt_Type - b.idReceipt_Type);
  }

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<ReceiptType[]>(this.url).pipe(
      tap(data => this.setList(data)));
  }
  insert(receiptType: ReceiptType) {
    return this.http.post(this.url, receiptType).pipe(
      tap(() => this.list().subscribe()));
  }
  delete(id: number) {  
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<ReceiptType>(`${this.url}/${id}`);
  }
  update(rt: ReceiptType) {
    return this.http.put(this.url, rt);
  }
  setList(newList: ReceiptType[]) {
    this.listChange.next(this.sortList(newList))
  }
  getList() {
    return this.listChange.asObservable();
  }

}
