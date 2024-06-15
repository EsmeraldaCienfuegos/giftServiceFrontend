import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { CategoryService } from '../../../services/category.service';
import { EntrepreneurshipService } from '../../../services/entrepreneurship.service';
import { MatSelectModule } from '@angular/material/select';

import { Category } from '../../../models/category';
import { FocusMonitor } from '@angular/cdk/a11y';
import { log } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/product.service';
import { Entrepreneurship } from '../../../models/entrepreneurship';

interface DialogData {
  id: number;
}
@Component({
  selector: 'app-insert-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatSelectModule

  ],
  templateUrl: './insert-product.component.html',
  styleUrl: './insert-product.component.css'
})
export class InsertProductComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  product: Product = new Product()
  edicion: boolean = false;
  id: number = 0;
  titulo: string = "Registrar"

  listEnterpre: Entrepreneurship[] = []
  listCategory: Category[] = []

  constructor(
    private fb: FormBuilder,
    private pS: ProductsService,
    private cS: CategoryService,
    private eS: EntrepreneurshipService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<InsertProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  ngOnInit(): void {
    this.id = this.data.id
    this.edicion = this.data.id != 0

    this.titulo = this.edicion ? "Modificar": "Registrar"  
    if (this.edicion) {
      this.init();
    }

    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required],
      entrepreneurship: ['', Validators.required]
    })

    this.cS.list().subscribe((data) => {
      this.listCategory = data
    })

    this.eS.list().subscribe((data) => {
      this.listEnterpre = data
    })
  }

  register() {
    if (this.form.valid) {
      this.product.idProduct = this.id
      this.product.nameProduct = this.form.value.name
      this.product.priceProduct = this.form.value.price
      this.product.descriptionProduct = this.form.value.description
      this.product.stockProduct = this.form.value.stock
      this.product.category.id = this.form.value.category
      this.product.entrepreneurship.id = this.form.value.entrepreneurship
      if (this.edicion) {
        this.pS.update(this.product).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
            console.log(`entro a modificar con: ${this.id}`);
          })
        })
      }
      else{
        this.pS.insert(this.product).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          })
        })
      }
      this.mostrarMensaje("Se registró correctamente el prodcuto");
        this.dialogRef.close();
    }

  }
  init(){
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data)=>{
        this.form = this.fb.group({
          name: new FormControl(data.nameProduct),
          price: new FormControl(data.priceProduct),
          description: new FormControl(data.descriptionProduct),
          stock: new FormControl(data.stockProduct),
          category: new FormControl(data.category.id),
          entrepreneurship: new FormControl(data.entrepreneurship.id),
        }) 
      })
    }
  }
  mostrarMensaje(ms: string) {
    let mensaje = ms
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }
}
