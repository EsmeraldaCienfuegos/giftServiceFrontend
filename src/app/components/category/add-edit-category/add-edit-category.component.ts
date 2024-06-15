import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../models/category';

interface DialogData {
  id: number;
}

@Component({
  selector: 'app-add-edit-category',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './add-edit-category.component.html',
  styleUrl: './add-edit-category.component.css'
})
export class AddEditCategoryComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  category: Category = new Category()
  edicion: boolean = false;
  id: number = 0;
  titulo:string= "Registrar"
  constructor(
    private fb: FormBuilder,  
    private cS: CategoryService,
    public _matDialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  ngOnInit(): void {

    this.id = this.data.id;
    this.edicion = this.data.id != 0;
    if (this.edicion) {
      this.titulo = "Modificar"
      this.init()
    }
    this.form = this.fb.group({
      id: [0],
      nameCategory: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.category.nameCategory = this.form.value.nameCategory
      this.category.id = this.id

      if (this.edicion){
        this.cS.update(this.category).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      else{
        this.cS.insert(this.category).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
    }
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        nameCategory: new FormControl(data.nameCategory)
      })
    })
  }
}
