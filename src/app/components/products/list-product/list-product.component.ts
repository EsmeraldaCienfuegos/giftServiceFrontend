import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { InsertProductComponent } from '../insert-product/insert-product.component';
import { MatTooltip } from '@angular/material/tooltip';
import { InsertImageComponent } from '../insert-image/insert-image.component';
import { ListImageComponent } from '../list-image/list-image.component';
import { RouterLink } from '@angular/router';
import { fakeAsync } from '@angular/core/testing';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/product.service';
// import 'sweetalert2/src/sweetalert2.crss'
// import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatPaginator,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatTooltip,
    RouterLink

  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{
  displayedColumns: string[] = [
    'id', 
    'name', 
    'price', 
    'description',
    'stok',
    'category',
    'entre',
    'acciones',
    'imagenes',
    'Añadir'
  ];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  @ViewChild(MatPaginator,{static:true}) paginator !: MatPaginator
  insertado: boolean = false

  constructor(
    private productService: ProductsService,
    public  matdialog: MatDialog
  ){}

  ngOnInit(): void {
    this.productService.list().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
    })
    this.productService.getList().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
    })
  }
  OpenModalInsert(){
    this.matdialog.open(InsertProductComponent,{
      data:{id:0},width:'60%',height:'75%'
    })
  }
  // ALL PRODUCT
  Update(idUpdate: number){
    this.matdialog.open(InsertProductComponent,{
      data:{id:idUpdate},width:'60%',height:'75%'
    })
  }
  deletee(idDelte: number){
    this.productService.delete(idDelte).subscribe((data)=>{
      this.productService.list().subscribe((data)=>{
        this.productService.setList(data)
      })
    })
  }
  // TODO DE IMAGENES 
  InsertImage(idProd: number){
    this.matdialog.open(InsertImageComponent,{
      data:{id:idProd, edit:false},width:'70%',height:'75%'
    })
  }
  EditImage(idProd: number){
    this.matdialog.open(InsertImageComponent,{
      data:{id:idProd, edit:true},width:'70%',height:'75%'
    })
  }
  ViewImage(idProd: number){
    this.matdialog.open(ListImageComponent,{
      data:{id:idProd},width:'50%',height:'90%'
    })
  }
}

