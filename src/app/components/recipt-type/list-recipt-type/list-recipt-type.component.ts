import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ReceiptType } from '../../../models/ReceiptType';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ReceiptTypeService } from '../../../services/receipt-type.service';
import { MAT_BUTTON_CONFIG, MatButton, MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RegisterReciptTypeComponent } from '../register-recipt-type/register-recipt-type.component';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-recipt-type',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    RegisterReciptTypeComponent,
    MatIconModule,
    MatButton,
    MatInputModule
  ],
  templateUrl: './list-recipt-type.component.html',
  styleUrl: './list-recipt-type.component.css'
})
export class ListReciptTypeComponent implements OnInit{
  displayedColumns:string[]=[
    'id',
    'name',
    'accion1',
    'accion2'
  ]
  
  dataSource: MatTableDataSource<ReceiptType> = new MatTableDataSource();
  @ViewChild(MatPaginator,{static:true}) paginator !: MatPaginator

  
  constructor(
    private gS:ReceiptTypeService, 
    public route:ActivatedRoute,
    public _matDialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.gS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
    })
    this.gS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
    })
  }
  OpenModalRegister():void{
    this._matDialog.open(RegisterReciptTypeComponent,{
    data:{id:0},width:'40%',height:'40%'
    });
  }

  Modificate(idT:Number){
    this._matDialog.open(RegisterReciptTypeComponent,{
    data:{id:idT},width:'40%',height:'40%'
    });
  }

  deletee(id: number) {
    this.gS.delete(id).subscribe((data)=>{
      this.gS.list().subscribe((data)=>{
        this.gS.setList(data)
      })
    })
  } 


}