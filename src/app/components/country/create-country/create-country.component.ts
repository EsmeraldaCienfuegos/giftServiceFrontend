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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  id: number;
}

@Component({
  selector: 'app-create-country',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './create-country.component.html',
  styleUrl: './create-country.component.css'
})
export class CreateCountryComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  countrY: Country = new Country();

  edicion: boolean = false;
  id: number = 0;
  titulo:string= "Registrar"

  constructor(private formBuilder: FormBuilder,
    private ctS: CountryService,
    private router:Router,
    private _snackBar: MatSnackBar,
    public _matDialogRef: MatDialogRef<CreateCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData
) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.edicion = this.data.id != 0;
    if (this.edicion) {
      this.init()
      this.titulo = "Modificar"
    }

    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/)]],
    });
  }
  
  registrar(): void {
    if (this.form.valid) {
      this.countrY.nameCountry=this.form.value.nombre
      this.countrY.idCountry=this.id

      if (this.edicion) {
        this.ctS.update(this.countrY).subscribe((data)=>{
          this.ctS.list().subscribe((data)=>{
            this.ctS.setList(data)
          });
          this.mostrarMensaje(false);
        });
      }
      else{
        this.ctS.insert(this.countrY).subscribe((data)=>{
          this.ctS.list().subscribe((data)=>{
            this.ctS.setList(data)
          });
          this.mostrarMensaje(false);
        });
      }
      this._matDialogRef.close()
    }
  }

  close(): void {
    this._matDialogRef.close();
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
    this.ctS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        nombre: new FormControl(data.nameCountry)
      })
    })
  }

}
