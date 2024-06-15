import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Entrepreneurship } from '../../../models/entrepreneurship';
import { EntrepreneurshipService } from '../../../services/entrepreneurship.service';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-list-entrepreneurship',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatInputModule, RouterModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule],
  templateUrl: './list-entrepreneurship.component.html',
  styleUrl: './list-entrepreneurship.component.css'
})
export class ListEntrepreneurshipComponent {
  dataSource: MatTableDataSource<Entrepreneurship> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id', 
    'nameEntrepreneurship', 
    'rucEntrepreneurship', 
    'locationEntrepreneurship',
    'phoneEntrepreneurship' ,
    'actions', 
    'actions 2', 
    'actions 3'];
    
  constructor(private eS: EntrepreneurshipService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.ngAfterViewInit()
    })
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.ngAfterViewInit()
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
  openDelete(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.eS.delete(id).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
    });
  }
}
