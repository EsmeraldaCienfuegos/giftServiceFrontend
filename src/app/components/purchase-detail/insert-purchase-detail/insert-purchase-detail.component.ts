import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule , NgIf} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink,Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseDetail } from '../../../models/PurchaseDetail';
import { PurchaseDetailService } from '../../../services/purchase-detail.service';
import { Product } from '../../../models/product';
import { Purchase } from '../../../models/Purchase';
import { PurchaseService } from '../../../services/purchase.service';
import { ProductsService } from '../../../services/product.service';

interface DialogData {
  id: number;
}
@Component({
  selector: 'app-insert-purchase-detail',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,FormsModule],
  templateUrl: './insert-purchase-detail.component.html',
  styleUrl: './insert-purchase-detail.component.css'
})
export class InsertPurchaseDetailComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  purchaseDetail: PurchaseDetail = new PurchaseDetail();

  edicion: boolean = false;
  id: number = 0;
  titulo: string = "Registrar"
  
  listaCompras: Purchase[] = [];
  listaproductos: Product[]=[];
  constructor(
    private pdS: PurchaseDetailService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private pchS: PurchaseService,
    private pdtS: ProductsService,

    public _matDialogRef: MatDialogRef<InsertPurchaseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData // aqui se obtiene los datos del parametro    
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.edicion = this.id !== 0;

    this.form = this.formBuilder.group({
      amounttotal: ['', Validators.required],
      cantidad: ['', Validators.required],
      compra: ['', Validators.required],
      producto: ['', Validators.required]
    });

    if (this.edicion) {
      this.init();
      this.titulo = "Modificar";
    }

    this.pchS.list().subscribe((data) => {
      this.listaCompras = data;
    });

    this.pdtS.list().subscribe((data) => {
      this.listaproductos = data;
    });
  }
  create(): void {
    if (this.form.valid) {
      this.purchaseDetail.idPurchaseDetail=this.id
      this.purchaseDetail.amountTotalPurchaseDetail=this.form.value.amounttotal;
      this.purchaseDetail.cantidadPurchaseDetail=this.form.value.cantidad;
      this.purchaseDetail.purchase.idPurchase=this.form.value.compra;
      this.purchaseDetail.product.idProduct=this.form.value.producto;
      if (this.edicion) {
        this.pdS.update(this.purchaseDetail).subscribe((data) => {
          this.pdS.list().subscribe((data) => {
            this.pdS.setList(data)
          });
          this.mostrarMensaje(false);
          this._matDialogRef.close()
        })
      }
      else {
        this.pdS.insert(this.purchaseDetail).subscribe((data) => {
          this.pdS.list().subscribe((data) => {
            this.pdS.setList(data);
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

  init(){
    this.pdS.listId(this.id).subscribe((data) => {
      this.form= new FormGroup({
        amounttotal: new FormControl(data.amountTotalPurchaseDetail),
        cantidad: new FormControl(data.cantidadPurchaseDetail),
        compra: new FormControl(data.purchase.idPurchase),
        producto: new FormControl(data.product.idProduct),
      })
    })
  }

}
