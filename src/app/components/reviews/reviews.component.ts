import { Component, OnInit, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';


import { Reviews } from '../../models/reviews';
import { ReviewsService } from '../../services/reviews.service';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../models/product';
import { UserWeb } from '../../models/UserWeb';
import { ProductsService } from '../../services/product.service';


@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatPaginator,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatTooltip,
    RouterLink,
    MatSelectModule,
    RouterOutlet

  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent  implements OnInit{
  displayedColumns: string[] = [
    'id', 
    'date', 
    'point', 
    'comentari',
    'product',
    'user',
    'acciones'
  ];
  ListProducts: Product[] = []
  ListUsers: UserWeb[] = []
  dataSource: MatTableDataSource<Reviews> = new MatTableDataSource();
  @ViewChild(MatPaginator,{static:true}) paginator !: MatPaginator
  insertado: boolean = false

  constructor(
    private reS: ReviewsService,
    private matdialog: MatDialog,
    private pS: ProductsService
  ){}
  ngOnInit(): void {
    this.reS.list().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
    })
    this.reS.getList().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
    })

    this.pS.list().subscribe((data) => {
      this.ListProducts = data;
    });
  }
  deletee(idDelte: number){
    this.reS.delete(idDelte).subscribe((data)=>{
      this.reS.list().subscribe((data)=>{
        this.reS.setList(data)
      })
    })
  }

}
