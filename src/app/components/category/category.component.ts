import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ListCategoryComponent } from './list-category/list-category.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterModule, ListCategoryComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(public route: ActivatedRoute) { }
}
