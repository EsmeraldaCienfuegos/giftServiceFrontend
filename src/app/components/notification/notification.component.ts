import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListNotificationComponent } from './list-notification/list-notification.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [RouterOutlet, ListNotificationComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
  constructor(public route:ActivatedRoute) { }
  ngOnInit(): void {

  }
}
