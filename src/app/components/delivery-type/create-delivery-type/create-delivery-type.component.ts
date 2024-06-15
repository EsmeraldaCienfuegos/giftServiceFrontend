import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeliveryType } from '../../../models/DeliveryType';
import { DeliveryTypeService } from '../../../services/delivery-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';


interface DialogData {
  id: number;
}

@Component({
  selector: 'app-create-delivery-type',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './create-delivery-type.component.html',
  styleUrl: './create-delivery-type.component.css',
})
export class CreateDeliveryTypeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  deliveryType: DeliveryType = new DeliveryType();

  edicion: boolean = false;
  id: number = 0;
  titulo: string = "Registrar"
  constructor(
    private formBuilder: FormBuilder,
    private dtS: DeliveryTypeService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public _matDialogRef: MatDialogRef<CreateDeliveryTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.edicion = this.data.id != 0;
    if (this.edicion) {
      this.init()
      this.titulo = "Modificar"
    }

    this.form = this.formBuilder.group({
      nombreTypeDelivery: ['', [Validators.required, Validators.pattern(/^[^\d]*$/)]],
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.deliveryType.nameDeliveryType = this.form.value.nombreTypeDelivery;
      this.deliveryType.idDeliveryType = this.id


      if (this.edicion) {
        this.dtS.update(this.deliveryType).subscribe((data) => {
          this.dtS.list().subscribe((data) => {
            this.dtS.setList(data);
          });
          this.mostrarMensaje(false);
          this._matDialogRef.close()
        });
      }
      else {
        this.dtS.insert(this.deliveryType).subscribe((data) => {
          this.dtS.list().subscribe((data) => {
            this.dtS.setList(data);
          });
          this.mostrarMensaje(false);
          this._matDialogRef.close()
        });
      }

    } else {
      this.form.markAllAsTouched();
      this.mostrarMensaje(true);
    }
  }

  mostrarMensaje(esError: boolean) {
    let mensaje = esError
      ? '¡Ha ocurrido un error!'
      : '¡Has registrado exitosamente!';
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

  init() {
    this.dtS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        nombreTypeDelivery: new FormControl(data.nameDeliveryType)
      })
    })
  }

}
