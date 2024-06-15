import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PaymentTypeService } from '../../../services/payment-type.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../../../models/PaymentType';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InsertpaymentTypeComponent } from '../insertpayment-type/insertpayment-type.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listpayment-type',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './listpayment-type.component.html',
  styleUrl: './listpayment-type.component.css',
})
export class ListpaymentTypeComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'accion1',
    'accion2'
  ];

  dataSource: MatTableDataSource<PaymentType> = new MatTableDataSource();
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;

  constructor(
    private gS: PaymentTypeService,
    public route: ActivatedRoute,
    private _matDialog: MatDialog) { }


  ngOnInit(): void {
    this.gS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.gS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  OpenModalRegister() {
    this._matDialog.open(InsertpaymentTypeComponent, {
      data: { id: 0 },width:'800px'
    });
  }

  Modificate(idT: Number) {
    this._matDialog.open(InsertpaymentTypeComponent, {
      data: { id: idT },width:'800px'
    });
  }

  deletee(id: number) {
    this.gS.delete(id).subscribe((data) => {
      this.gS.list().subscribe((data) => {
        this.gS.setList(data)
      })
    })
  }

}


