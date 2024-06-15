import { Component, OnInit, ViewChild } from '@angular/core';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';




import { MatCardModule } from '@angular/material/card';
import { ProductsForSale } from '../../models/ProductsForSale';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/product.service';
import { ReviewsService } from '../../services/reviews.service';
@Component({
  selector: 'app-view-prodcuts-for-sale',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,

    MatCardModule,
    CommonModule
  ],
  templateUrl: './view-prodcuts-for-sale.component.html',
  styleUrl: './view-prodcuts-for-sale.component.css'
})
export class ViewProdcutsForSaleComponent implements OnInit {

  // ListProducts: Products[] = []
  // ListUsers: Users[] = []
  liststProducts: ProductsForSale[] = []
  constructor(
    private reS: ReviewsService,
    private prs: ProductsService,
    private matdialog: MatDialog,
    // private route: ActivatedRoute,
    private router: Router,

  ) { }
  ngOnInit(): void {
    this.prs.listProductForSale().subscribe((data) => {
      this.liststProducts = data
    })
  }
  OpenProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
