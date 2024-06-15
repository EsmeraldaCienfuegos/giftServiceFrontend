import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink,Router } from '@angular/router';
import { Purchase } from '../../../models/Purchase';
import { PaymentType } from '../../../models/PaymentType';
import { DeliveryType } from '../../../models/DeliveryType';
import { ReceiptType } from '../../../models/ReceiptType';
import { UserWeb } from '../../../models/UserWeb';
import { PurchaseService } from '../../../services/purchase.service';
import { PaymentTypeService } from '../../../services/payment-type.service';
import { DeliveryTypeService } from '../../../services/delivery-type.service';
import { ReceiptTypeService } from '../../../services/receipt-type.service';
import { UserwebService } from '../../../services/userweb.service';
import moment from 'moment'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DialogData {
  id: number;
}

@Component({
  selector: 'app-insert-purchase',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,FormsModule],
  templateUrl: './insert-purchase.component.html',
  styleUrl: './insert-purchase.component.css'
})
export class InsertPurchaseComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  pllmaxfecha:Date=moment().add(0,'days').toDate();
  purchase: Purchase = new Purchase();

  edicion: boolean = false;
  id: number = 0;
  titulo: string = "Registrar"
  
  listaCompras: Purchase[] = [];
  listatiposdepago: PaymentType[]=[]
  listadeentrega: DeliveryType[]=[]
  listarecibo: ReceiptType[]=[]
  listaususarios: UserWeb[]= [] 

  listaestadocompra: { value: string; viewValue: string }[] = [
    { value: 'true', viewValue: 'Compra' },
    { value: 'false', viewValue: 'Cancelado' },
  ];
  constructor(
    private pS: PurchaseService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private ptS: PaymentTypeService,
    private dtS: DeliveryTypeService,
    private rtS: ReceiptTypeService,
    private us: UserwebService,

    public _matDialogRef: MatDialogRef<InsertPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData // aqui se obtiene los datos del parametro    
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.edicion = this.data.id != 0;
    if (this.edicion) {
      this.init()
      this.titulo = "Modificar"
    }
    this.form = this.formBuilder.group({
      precio: ['', Validators.required],
      fecha: ['', Validators.required],
      estado:['',Validators.required],
      direccion: [ '', Validators.required ],
      tipodeEntrega:['',Validators.required],
      tipodePago:['',Validators.required],
      tipodeRecibo:['',Validators.required],
      usuario:['',Validators.required]
    });
    this.ptS.list().subscribe((data) => {
      this.listatiposdepago = data;
    });
    this.dtS.list().subscribe((data) => {
      this.listadeentrega = data;
    });
    this.rtS.list().subscribe((data) => {
      this.listarecibo = data;
    });
    this.us.list().subscribe((data) => {
      this.listaususarios = data;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.purchase.idPurchase=this.id
      this.purchase.pricePurchase=this.form.value.precio;
      this.purchase.datePurchase=this.form.value.fecha;
      this.purchase.purchaseStatus=this.form.value.estado;
      this.purchase.address=this.form.value.direccion;
      this.purchase.deliveryTypes.idDeliveryType=this.form.value.tipodeEntrega;
      this.purchase.paymentTypes.idPayment_Type=this.form.value.tipodePago;
      this.purchase.receiptTypes.idReceipt_Type=this.form.value.tipodeRecibo;
      this.purchase.users.idUser=this.form.value.usuario

      if (this.edicion) {
        this.pS.update(this.purchase).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data)
          });
          this.mostrarMensaje(false);
          this._matDialogRef.close()
        })
      }
      else {
        this.pS.insert(this.purchase).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
          this.mostrarMensaje(false);
          this._matDialogRef.close()
        })
      
      }
    }
    else {
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

  init(){
    this.pS.listId(this.id).subscribe((data) => {
      this.form= new FormGroup({
        precio: new FormControl(data.pricePurchase),
        fecha: new FormControl(data.datePurchase),
        estado: new FormControl(data.purchaseStatus),
        direccion: new FormControl(data.address),
        tipodeEntrega: new FormControl(data.deliveryTypes.idDeliveryType),
        tipodePago: new FormControl(data.paymentTypes.idPayment_Type),
        tipodeRecibo: new FormControl(data.receiptTypes.idReceipt_Type),
        usuario: new FormControl(data.users.idUser),
      })
    })
  }
}
