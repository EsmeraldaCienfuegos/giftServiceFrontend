import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Purchase } from '../../../models/Purchase';
import { PurchaseService } from '../../../services/purchase.service';
import { InsertPurchaseComponent } from '../insert-purchase/insert-purchase.component';

@Component({
  selector: 'app-list-purchase',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './list-purchase.component.html',
  styleUrl: './list-purchase.component.css'
})
export class ListPurchaseComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'precio',
    'fechaCompra',
    'estadoCompra',
    'direccion',
    'tipodeEntrega',
    'tipodePago',
    'tipodeRecibo',
    'usuario',
    'accion1',
    'accion2'
  ];

  dataSource: MatTableDataSource<Purchase> = new MatTableDataSource();
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;

  constructor(
    private pS: PurchaseService,
    public route: ActivatedRoute,
    private _matDialog: MatDialog) { }


  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  OpenModalRegister() {
    this._matDialog.open(InsertPurchaseComponent, {
      data: { id: 0 },width:'800px'
    });
  }

  Modificate(idT: Number) {
    this._matDialog.open(InsertPurchaseComponent, {
      data: { id: idT },width:'800px'
    });
  }

  deletee(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data)
      })
    })
  }
}
