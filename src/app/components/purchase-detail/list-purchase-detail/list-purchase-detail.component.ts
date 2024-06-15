import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PurchaseDetail } from '../../../models/PurchaseDetail';
import { PurchaseDetailService } from '../../../services/purchase-detail.service';
import { InsertPurchaseDetailComponent } from '../insert-purchase-detail/insert-purchase-detail.component';

@Component({
  selector: 'app-list-purchase-detail',
  standalone: true,
  imports: [    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './list-purchase-detail.component.html',
  styleUrl: './list-purchase-detail.component.css'
})
export class ListPurchaseDetailComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'amounttotal',
    'cantidad',
    'compra',
    'producto',
    'accion1',
    'accion2'
  ];

  dataSource: MatTableDataSource<PurchaseDetail> = new MatTableDataSource();
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;

  constructor(
    private pdS: PurchaseDetailService,
    public route: ActivatedRoute,
    private _matDialog: MatDialog) { }


  ngOnInit(): void {
    this.pdS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.pdS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  OpenModalRegister() {
    this._matDialog.open(InsertPurchaseDetailComponent, {
      data: { id: 0 },width:'800px'
    });
  }

  Modificate(idT: Number) {
    this._matDialog.open(InsertPurchaseDetailComponent, {
      data: { id: idT },width:'800px'
    });
  }

  deletee(id: number) {
    this.pdS.delete(id).subscribe((data) => {
      this.pdS.list().subscribe((data) => {
        this.pdS.setList(data)
      })
    })
  }
}
