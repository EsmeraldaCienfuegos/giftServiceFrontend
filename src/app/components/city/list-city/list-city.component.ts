import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { City } from '../../../models/city';
import { CityService } from '../../../services/city.service';
import { InsertCityComponent } from '../insert-city/insert-city.component';

@Component({
  selector: 'app-list-city',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginator, MatButtonModule, MatIconModule],
  templateUrl: './list-city.component.html',
  styleUrl: './list-city.component.css'
})
export class ListCityComponent implements OnInit{
  displayedColumns: string[] = [
    'codigoCiudad',
    'nombreCiudad',
    'editar',
    'eliminar'
  ];

  dataSource: MatTableDataSource<City> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator
  constructor(private cityS: CityService, private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.cityS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
    this.cityS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  OpenModalRegister() {
    this._matDialog.open(InsertCityComponent, {
      data: { id: 0 }, width: '900px'
    });
  }

  Modificate(idT: Number) {
    this._matDialog.open(InsertCityComponent, {
      data: { id: idT }, width: '900px'
    });
  }

  deletee(id: number) { 
    this.cityS.delete(id).subscribe((data) => {
      this.cityS.list().subscribe((data) => {
        this.cityS.setList(data)
      })
    })
  }

}
