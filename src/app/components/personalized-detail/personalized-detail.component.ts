import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { InsertPersonalizeddetailComponent } from './insert-personalizeddetail/insert-personalizeddetail.component';
import { ListPersonalizeddetailComponent } from './list-personalizeddetail/list-personalizeddetail.component';

@Component({
  selector: 'app-personalized-detail',
  standalone: true,
  imports: [RouterOutlet, InsertPersonalizeddetailComponent,ListPersonalizeddetailComponent],
  templateUrl: './personalized-detail.component.html',
  styleUrl: './personalized-detail.component.css'
})
export class PersonalizedDetailComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
      
  }
}
