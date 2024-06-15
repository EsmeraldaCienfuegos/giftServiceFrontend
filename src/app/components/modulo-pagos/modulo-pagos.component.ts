import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterOutlet } from '@angular/router'; 
import { PaymentTypeComponent } from '../payment-type/payment-type.component';
import { ReciptTypeComponent } from '../recipt-type/recipt-type.component';
import { DeliveryTypeComponent } from '../delivery-type/delivery-type.component';


@Component({
  selector: 'app-modulo-pagos',
  standalone: true,
  imports: [
    MatTabsModule,
    PaymentTypeComponent,
    ReciptTypeComponent,
    DeliveryTypeComponent,
    RouterOutlet
  ],
  templateUrl: './modulo-pagos.component.html',
  styleUrl: './modulo-pagos.component.css'
})
export class ModuloPagosComponent implements OnInit{

  constructor(public route:ActivatedRoute,private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    
  }

}


