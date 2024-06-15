import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../../services/notification.service';
import { Notification } from '../../../models/Notification';
import { InsertNotificationComponent } from '../insert-notification/insert-notification.component';

@Component({
  selector: 'app-list-notification',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginator, MatButtonModule, MatIconModule],
  templateUrl: './list-notification.component.html',
  styleUrl: './list-notification.component.css'
})
export class ListNotificationComponent implements OnInit{
  displayedColumns: string[] = [
    'codigoNotificacion',
    'fechaEmision',
    'mensajeNotificacion',
    'editar',
    'eliminar'
  ];

  dataSource: MatTableDataSource<Notification> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator
  constructor(private notiS: NotificationService, private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.notiS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
    this.notiS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  OpenModalRegister() {
    this._matDialog.open(InsertNotificationComponent, {
      data: { id: 0 }, width: '900px'
    });
  }

  Modificate(idT: Number) {
    this._matDialog.open(InsertNotificationComponent, {
      data: { id: idT }, width: '900px'
    });
  }

  deletee(id: number) { 
    this.notiS.delete(id).subscribe((data) => {
      this.notiS.list().subscribe((data) => {
        this.notiS.setList(data)
      })
    })
  }
}
