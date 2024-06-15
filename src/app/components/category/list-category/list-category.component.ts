import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-list-category',
  standalone: true, 
  imports: [MatFormFieldModule, MatDialogModule, MatInputModule, RouterModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id', 
    'nameCategory',
    'accion1',
    'accion2'
  ];
  constructor(private cS: CategoryService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.ngAfterViewInit()
    })
    this.cS.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.ngAfterViewInit()
    });
  }
  openDialog(): void {
    this.dialog.open(AddEditCategoryComponent,{
      data:{id:0}
      });
  }
  ngAfterViewInit() {
    if (this.dataSource != null) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Modificate(idT:Number){
    this.dialog.open(AddEditCategoryComponent,{
    data:{id:idT}
    });
  }

  deletee(id: number) {
    this.cS.delete(id).subscribe((data)=>{
      this.cS.list().subscribe((data)=>{
        this.cS.setList(data)
      })
    })
  } 

}
