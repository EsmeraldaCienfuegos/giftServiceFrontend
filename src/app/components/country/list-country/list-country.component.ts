import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CreateCountryComponent } from '../create-country/create-country.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-country',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginator, MatButtonModule, MatIconModule],
  templateUrl: './list-country.component.html',
  styleUrl: './list-country.component.css'
})
export class ListCountryComponent implements OnInit {
  displayedColumns: string[] = [
    'codigoPais',
    'nombrePais',
    'actualizar',
    'eliminar'
  ];

  dataSource: MatTableDataSource<Country> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator
  constructor(private cS: CountryService, private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  OpenModalRegister() {
    this._matDialog.open(CreateCountryComponent, {
      data: { id: 0 }, width: '900px'
    });
  }

  Modificate(idT: Number) {
    this._matDialog.open(CreateCountryComponent, {
      data: { id: idT }, width: '900px'
    });
  }

  deletee(id: number) { 
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data)
      })
    })
  }


}
