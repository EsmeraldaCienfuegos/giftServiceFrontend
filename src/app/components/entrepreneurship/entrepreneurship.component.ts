import { Component } from '@angular/core';
import { ListEntrepreneurshipComponent } from './list-entrepreneurship/list-entrepreneurship.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-entrepreneurship',
  standalone: true,
  imports: [RouterModule, ListEntrepreneurshipComponent],
  templateUrl: './entrepreneurship.component.html',
  styleUrl: './entrepreneurship.component.css'
})
export class EntrepreneurshipComponent {
  constructor(public route: ActivatedRoute) { }
}
