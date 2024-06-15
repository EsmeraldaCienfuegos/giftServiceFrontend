import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListpaymentTypeComponent } from './listpayment-type/listpayment-type.component';

@Component({
  selector: 'app-payment-type',
  standalone: true,
  imports: [RouterOutlet,ListpaymentTypeComponent],
  templateUrl: './payment-type.component.html',
  styleUrl: './payment-type.component.css'
})
export class PaymentTypeComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {}
}

