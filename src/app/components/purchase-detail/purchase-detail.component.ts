import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListPurchaseDetailComponent } from './list-purchase-detail/list-purchase-detail.component';

@Component({
  selector: 'app-purchase-detail',
  standalone: true,
  imports: [RouterOutlet,ListPurchaseDetailComponent],
  templateUrl: './purchase-detail.component.html',
  styleUrl: './purchase-detail.component.css'
})
export class PurchaseDetailComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
  }

}
