import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReceiptTypeService } from '../../../services/receipt-type.service';
import { Router, RouterOutlet } from '@angular/router';
import { ReceiptType } from '../../../models/ReceiptType';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  id: number;
}

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-register-recipt-type',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,

    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './register-recipt-type.component.html',
  styleUrl: './register-recipt-type.component.css'
})
export class RegisterReciptTypeComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  receiptType: ReceiptType = new ReceiptType()
  edicion: boolean = false;
  id: number = 0;
  titulo:string= "Registrar"
  
  constructor(
    private fb: FormBuilder,
    private rS: ReceiptTypeService, 

    public _matDialogRef: MatDialogRef<RegisterReciptTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData // aqui se obtiene los datos del parametro   
    // detallefon 

  ) { }

  ngOnInit(): void { 
    this.id = this.data.id;
    this.edicion = this.data.id != 0;
    if (this.edicion) {
      this.init()
      this.titulo = "Modificar"
    }
    
    this.form = this.fb.group({
      name: ['', Validators.required],
    })
  }

  register(): void {
    if (this.form.valid) { 
      this.receiptType.nameReceipt_Type = this.form.value.name
      this.receiptType.idReceipt_Type = this.id

      if (this.edicion) {
        this.rS.update(this.receiptType).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data)
          })
        })
      }
      else {
        this.rS.insert(this.receiptType).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data)
          })
        })
      }
    }
  }

  init() {
    this.rS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        name: new FormControl(data.nameReceipt_Type)
      })
    })
  }
}



