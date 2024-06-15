import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PaymentType } from '../../../models/PaymentType';
import { PaymentTypeService } from '../../../services/payment-type.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  id: number;
}

@Component({
  selector: 'app-insertpayment-type',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule, MatButtonModule],
  templateUrl: './insertpayment-type.component.html',
  styleUrl: './insertpayment-type.component.css'
})
export class InsertpaymentTypeComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  payment_type: PaymentType = new PaymentType()

  edicion: boolean = false;
  id: number = 0;
  titulo: string = "Registrar"
  constructor(
    private fb: FormBuilder,
    private rS: PaymentTypeService,
    private router: Router,

    public _matDialogRef: MatDialogRef<InsertpaymentTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData // aqui se obtiene los datos del parametro    
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

  create() {
    this.payment_type.namePayment_Type = this.form.value.name
    this.payment_type.idPayment_Type = this.id

    if (this.edicion) {
      this.rS.update(this.payment_type).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data)
        })
      })
    }
    else {
      this.rS.create(this.payment_type).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data)
        })
      })
    }
    this.closeDialog()
  }
  closeDialog(): void {
    this._matDialogRef.close();
  }

  init() {
    this.rS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        name: new FormControl(data.namePayment_Type)
      })
    })
  }
}