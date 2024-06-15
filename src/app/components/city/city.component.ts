import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListCityComponent } from './list-city/list-city.component';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [RouterOutlet, ListCityComponent],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit{
  constructor(public route:ActivatedRoute) { }
  ngOnInit(): void {

  }
}
