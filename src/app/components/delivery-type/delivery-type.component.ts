import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListDeliveryTypeComponent } from './list-delivery-type/list-delivery-type.component';

@Component({
  selector: 'app-delivery-type',
  standalone: true,
  imports: [
    RouterOutlet,
    ListDeliveryTypeComponent
  ],
  templateUrl: './delivery-type.component.html',
  styleUrl: './delivery-type.component.css'
})
export class DeliveryTypeComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
