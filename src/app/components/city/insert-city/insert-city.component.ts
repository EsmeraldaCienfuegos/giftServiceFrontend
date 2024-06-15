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
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from '../../../models/city';
import { CityService } from '../../../services/city.service';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';

interface DialogData {
  id: number;
}

@Component({
  selector: 'app-insert-city',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './insert-city.component.html',
  styleUrl: './insert-city.component.css'
})
export class InsertCityComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  citY: City = new City();
  listaPaises: Country[] = [];

  edicion: boolean = false;
  id: number = 0;
  titulo:string= "Registrar"

  constructor(private formBuilder: FormBuilder,
    private ctyS: CityService,
    private countryS: CountryService,
    private router:Router,
    private _snackBar: MatSnackBar,
    public _matDialogRef: MatDialogRef<InsertCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.edicion = this.data.id != 0;
    if (this.edicion) {
      this.init()
      this.titulo = "Modificar"
    }

    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/)]],
      pais:['',Validators.required]
    });

    this.countryS.list().subscribe((data) => {
      this.listaPaises = data;
    });
  }
  
  registrar(): void {
    if (this.form.valid) {
      this.citY.nameCity=this.form.value.nombre
      this.citY.idCity=this.id
      this.citY.counTry.idCountry = this.form.value.pais;

      if (this.edicion) {
        this.ctyS.update(this.citY).subscribe((data)=>{
          this.ctyS.list().subscribe((data)=>{
            this.ctyS.setList(data)
          })
          this.mostrarMensaje(false);
        })
      }
      else{
        this.ctyS.insert(this.citY).subscribe((data)=>{
          this.ctyS.list().subscribe((data)=>{
            this.ctyS.setList(data)
          })
          this.mostrarMensaje(false);
        })
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
    this.ctyS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        nombre: new FormControl(data.nameCity),
        pais: new FormControl(data.counTry.idCountry)
      })
    })
  }
}
