import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListCountryComponent } from './list-country/list-country.component';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [RouterOutlet, ListCountryComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit{
  constructor(public route:ActivatedRoute) { }
  ngOnInit(): void {

  }
}
