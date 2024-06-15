import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversation } from '../models/conversation';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private url = environment.base + '/conversations';
  private listConversation = new Subject<Conversation[]>();
  constructor(private http: HttpClient) { }
  list(idUser: number, idEntrepreneurship: number) {
    return this.http.get<Conversation[]>(this.url + '/Mensajes?user_id=' + idUser + '&entrepreneurship_id=' + idEntrepreneurship);
  }
  insert(conversation: Conversation) {
    return this.http.post(this.url, conversation);
  }
  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
  getAll() {
    return this.listConversation.asObservable();
  }
  setList(list: Conversation[]) {
    this.listConversation.next(list);
  }
}
