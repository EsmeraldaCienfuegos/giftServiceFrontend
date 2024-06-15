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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import moment from 'moment';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserWeb } from '../../../models/UserWeb';
import { Notification } from '../../../models/Notification';
import { NotificationService } from '../../../services/notification.service';
import { UserwebService } from '../../../services/userweb.service';

interface DialogData {
  id: number;
}

@Component({
  selector: 'app-insert-notification',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './insert-notification.component.html',
  styleUrl: './insert-notification.component.css'
})
export class InsertNotificationComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  notY: Notification = new Notification();
  minFecha: Date = moment().add('days').toDate();
  listaUsuarios: UserWeb[] = [];

  edicion: boolean = false;
  id: number = 0;
  titulo:string= "Registrar"

  constructor(private formBuilder: FormBuilder,
    private ctyS: NotificationService,
    private usrS: UserwebService,
    private router:Router,
    private _snackBar: MatSnackBar,
    public _matDialogRef: MatDialogRef<InsertNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.edicion = this.data.id != 0;
    if (this.edicion) {
      this.init()
      this.titulo = "Modificar"
    }

    this.form = this.formBuilder.group({
      fechaemision: ['', Validators.required],
      mensaje: ['', Validators.required],
      userweb:['',Validators.required]
    });

    this.usrS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  
  registrar(): void {
    if (this.form.valid) {
      this.notY.emissionDate=this.form.value.fechaemision
      this.notY.message=this.form.value.mensaje
      this.notY.idNotification=this.id
      this.notY.usEr.idUser = this.form.value.userweb;

      this.usrS.listId(this.form.value.userweb).subscribe((user) => {
        this.notY.usEr.mail = user.mail;
  
        if (this.edicion) {
          this.ctyS.update(this.notY).subscribe((data) => {
            this.ctyS.list().subscribe((data) => {
              this.ctyS.setList(data);
            });
            this.mostrarMensaje(false);
          });
        } else {
          this.ctyS.insert(this.notY).subscribe((data) => {
            this.ctyS.list().subscribe((data) => {
              this.ctyS.setList(data);
            });
          });
          this.mostrarMensaje(false);
        }
        this._matDialogRef.close();
      });
    }
  }

  close(): void {
    this._matDialogRef.close();
  }

  mostrarMensaje(esError: boolean) {
    let mensaje = esError
      ? '¡Ha ocurrido un error!'
      : '¡Has registrado exitosamente la notificación, espera a que se envíe!';
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

  init() {
    this.ctyS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        fechaemision: new FormControl(data.emissionDate),
        mensaje: new FormControl(data.message),
        userweb: new FormControl(data.usEr.idUser)
      })
    })
  }

}
