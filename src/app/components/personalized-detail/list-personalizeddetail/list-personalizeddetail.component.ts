import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PersonalizedDetail } from '../../../models/personalizeddetail';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PersonalizedDetailService } from '../../../services/personalized-detail.service';
import { UploadService } from '../../../services/upload.service';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-list-personalizeddetail',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    RouterLink,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './list-personalizeddetail.component.html',
  styleUrl: './list-personalizeddetail.component.css',
})
export class ListPersonalizeddetailComponent implements OnInit {
  dataSource: MatTableDataSource<PersonalizedDetail> = new MatTableDataSource();
  displayedColumns: string[] = [
    'image',
    'emprendimiento',
    'descripcion',
    'precio',
    'acciones',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  baseUrl: string = '';

  constructor(
    private pdS: PersonalizedDetailService,
    private uS: UploadService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.baseUrl = this.uS.getBaseUrl();
    this.pdS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pdS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  getImageUrl(filename: string): string {
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename;
    }
    if (!filename) {
      return '';
    }
    return `${this.baseUrl}/${filename}`;
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

  deletes(id: number) {
    this.pdS.delete(id).subscribe((data) => {
      this.pdS.list().subscribe((data) => {
        this.pdS.setList(data)
        this.mostrarMensajeEliminar(false)
      })
    })
    this.mostrarMensajeEliminar(true)
  }

  mostrarMensajeEliminar(esError: boolean, mensajeError?: string) {
    let mensaje = esError
      ? '¡No lo puedes eliminar aun tienes un producto con esta personalizacion'
      : '¡Haz eliminado un detalle personalizado!';
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }
}
