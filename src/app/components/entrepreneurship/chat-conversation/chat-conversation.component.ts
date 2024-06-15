import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConversationService } from '../../../services/conversation.service';
import { Conversation } from '../../../models/conversation';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-conversation',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './chat-conversation.component.html',
  styleUrl: './chat-conversation.component.css'
})
export class ChatConversationComponent {
  conversations: Conversation[] = []
  idEntrepreneurship: number = 0;
  idUser: number = 0;
  newMessage: string = "";
  entrepreneurshipName: string = "";
  constructor(private cS: ConversationService, private route: ActivatedRoute) {}
  ngOnInit(){
    this.idEntrepreneurship = this.route.snapshot.params["id"];
    this.idUser = 2; //parseInt(localStorage.getItem('idUser')!);
    this.cS.list(this.idUser, this.idEntrepreneurship).subscribe((data) => {
      this.conversations = data;
      if (data.length > 0) {
        this.entrepreneurshipName = data[0].entrepreneurship.nameEntrepreneurship;
      }
    });
    this.cS.getAll().subscribe((data: Conversation[]) => {
      this.conversations = data
    })
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      let message:Conversation = new Conversation();
      message.textConversation = this.newMessage;
      message.dateConversation = new Date();
      message.users.idUser = this.idUser;
      message.entrepreneurship.id = this.idEntrepreneurship;
      this.cS.insert(message).subscribe(() => {
        this.cS.list(this.idUser, this.idEntrepreneurship).subscribe((data) => {
          this.cS.setList(data);
          this.newMessage = "";
        });
      });
    }
  }
}
