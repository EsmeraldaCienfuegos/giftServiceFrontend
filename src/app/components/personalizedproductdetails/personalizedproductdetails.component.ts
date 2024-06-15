  import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListPersonalizedproductdetailsComponent } from './list-personalizedproductdetails/list-personalizedproductdetails.component';
import { InsertPersonalizedproductdetailsComponent } from './insert-personalizedproductdetails/insert-personalizedproductdetails.component';

@Component({
  selector: 'app-personalizedproductdetails',
  standalone: true,
  imports: [RouterOutlet,InsertPersonalizedproductdetailsComponent],
  templateUrl: './personalizedproductdetails.component.html',
  styleUrl: './personalizedproductdetails.component.css'
})
export class PersonalizedproductdetailsComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
      
  }
}
