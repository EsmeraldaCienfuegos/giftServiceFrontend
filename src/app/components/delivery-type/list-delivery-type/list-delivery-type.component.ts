import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { DeliveryType } from '../../../models/DeliveryType';
import { DeliveryTypeService } from '../../../services/delivery-type.service';
import { CreateDeliveryTypeComponent } from '../create-delivery-type/create-delivery-type.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-delivery-type',
  standalone: true,
  imports: [MatTableModule, 
    MatPaginatorModule, 
    MatPaginator, 
    MatButtonModule,
    MatIconModule],
  templateUrl: './list-delivery-type.component.html',
  styleUrl: './list-delivery-type.component.css'
})
export class ListDeliveryTypeComponent implements OnInit{
  displayedColumns: string [] =[
    'codigoTipoEntrega',
    'nombreTipoEntrega',
    'accion1',
    'accion2'
  ]

  @ViewChild(MatPaginator,{static:true}) paginator !: MatPaginator
  dataSource: MatTableDataSource<DeliveryType> = new MatTableDataSource();
  constructor(private dtS: DeliveryTypeService, private _matDialog: MatDialog) { }

  ngOnInit(): void {
      this.dtS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.dtS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data),
    this.dataSource.paginator = this.paginator

    })
    this.dataSource.paginator = this.paginator
  }

  OpenModalRegister(){
    this._matDialog.open(CreateDeliveryTypeComponent,{
      data:{id:0},width:'800px'
    });
  }
  Modificate(idDT:Number){
    this._matDialog.open(CreateDeliveryTypeComponent,{
    data:{id:idDT},width:'800px'
    });
  }

  deletee(id: number) {
    this.dtS.delete(id).subscribe((data)=>{
      this.dtS.list().subscribe((data)=>{
        this.dtS.setList(data)
      })
    })
  } 
}
