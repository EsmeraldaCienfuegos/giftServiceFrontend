import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterOutlet,
    ListProductComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(public route: ActivatedRoute) { }
}
