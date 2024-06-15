import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ListPurchaseComponent } from './list-purchase/list-purchase.component';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [RouterOutlet, ListPurchaseComponent],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
  }
}
