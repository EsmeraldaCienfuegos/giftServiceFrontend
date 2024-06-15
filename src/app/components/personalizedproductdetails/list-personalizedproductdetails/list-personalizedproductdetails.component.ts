import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PersonalizedProductDetail } from '../../../models/personalizedproductdetail';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PersonalizedproductdetailsService } from '../../../services/personalizedproductdetails.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-list-personalizedproductdetails',
  standalone: true,
  imports: [
    MatTableModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './list-personalizedproductdetails.component.html',
  styleUrl: './list-personalizedproductdetails.component.css',
})
export class ListPersonalizedproductdetailsComponent implements OnInit {
  dataSource: MatTableDataSource<PersonalizedProductDetail> =
    new MatTableDataSource();
  displayedColumns: string[] = [
    'producto',
    'detallepersonalizado',
    'precio',
    'acciones',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private ppdS: PersonalizedproductdetailsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ppdS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.ppdS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  calculateTotalPrice(element: PersonalizedProductDetail): number {
    return (
      element.products.priceProduct +
      element.personalizedDetails.additionalPricePersonalizedDetail
    );
  }

  deletes(id: number) {
    this.ppdS.delete(id).subscribe((data) => {
      this.ppdS.list().subscribe((data) => {
        this.ppdS.setList(data);
        this.mostrarMensajeEliminar(false);
      });
    });
    this.mostrarMensajeEliminar(true);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deletes(id);
      }
    });
  }

  mostrarMensajeEliminar(esError: boolean, mensajeError?: string) {
    let mensaje = esError
      ? '¡No lo puedes eliminar'
      : '¡Haz eliminado un detalle personalizado a un producto!';
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }
}
