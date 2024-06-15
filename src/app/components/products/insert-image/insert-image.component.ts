import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MediaService } from '../../../services/media.service';
import { ProductImageDetail } from '../../../models/ProductImageDetail';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BlobOptions } from 'buffer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductImageDetailService } from '../../../services/product-image-detail.service';

interface DialogData {
  id: number;
  edit: boolean
}

@Component({
  selector: 'app-insert-image',
  standalone: true,
  imports: [

    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    MatCardModule,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  templateUrl: './insert-image.component.html',
  styleUrl: './insert-image.component.css'
})
export class InsertImageComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  ocultarBoton: boolean = true
  progress_bar: boolean = true
  eliminarImage: boolean = true
  edit:boolean = false;

  idProductoRegister: number = 0
  previewUrls: (string | ArrayBuffer | null)[] = [null, null, null, null]
  images: (File | null)[] = [null, null, null, null];
  urlsImages: (string)[] = [];
  productImageDeteil: ProductImageDetail = new ProductImageDetail()
  proImDetAll:ProductImageDetail[] =  []
  files: (File | null)[] = [null, null, null, null];

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private mS: MediaService,
    private urlsS: ProductImageDetailService,
    public dialogRef: MatDialogRef<InsertImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.idProductoRegister = this.data.id
    this.edit = this.data.edit
    console.log(this.data);

    this.form = this.fb.group({
      imagePrincipal: [null, Validators.required],
      image2: [null],
      image3: [null],
      image4: [null],
    })

    if(this.edit){
      this.init()
    }
  }

  // ======================= FUNCIONES PARA PREVIZUALIZAR IMAGENES ===============
  onFileSelected(event: Event, num: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrls[num] = reader.result;
        // this.images[num] = file
        this.files[num] = file;
      };
      reader.readAsDataURL(file);
      if (num == 0) { (this.ocultarBoton = false) }
    }
  }

  ClearImage(i: number) {
    this.previewUrls[i] = null;
    this.files[i] = null;
    if (i == 0) {
      this.ocultarBoton = true;
    }
  }

  async register() {
    this.progress_bar = false;
    if (!this.ocultarBoton) {
      const uploadPromises: Promise<void>[] = this.files.map((file, index) => {
        if (file) {
          return this.upload(file).toPromise().then((res) => {
            this.urlsImages.push(res.url);
          });
        } else {
          return Promise.resolve();
        }
      });

      Promise.all(uploadPromises).then(() => {
        this.insertUrlImage();
        this.progress_bar = false;
        this.mostrarMensaje('Se registró correctamente todas las imágenes');
        this.dialogRef.close();
      }).catch(() => {
        this.mostrarMensaje('Error al registrar las imágenes');
      });
    } else {
      this.mostrarMensaje('Primero ingrese la imagen principal');
    }
  }

  upload(file: File) {
    const formData = new FormData()
    formData.append('file', file);
    return this.mS.uploadFile(formData)
  }

  // SE REGISTRA TODAS LAS IMAGENES A LA TABLA DE "ProductImageDetail"
  async insertUrlImage() {

    this.productImageDeteil.products.idProduct = this.idProductoRegister;
    try {
      for (let i = 0; i < this.urlsImages.length; i++) {
        const url = this.urlsImages[i];
        if (url) {
          this.productImageDeteil.imageRoute = url;
          this.productImageDeteil.numProductImage = i + 1;
          if (this.edit) {
            await this.urlsS.update(this.productImageDeteil).toPromise();
          }
          else{
            await this.urlsS.insert(this.productImageDeteil).toPromise();
          }
        }
      }
    } catch (e) {
      this.mostrarMensaje('Error al insertar el url de las imagenes');
    }
  }

  mostrarMensaje(ms: string) {
    let mensaje = ms
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 4000,
    });
  }
  init() {
    this.urlsS.listImageByProductId(this.idProductoRegister).subscribe((images: ProductImageDetail[])=>{
      images.forEach((image, index) => {
        this.previewUrls[index] = image.imageRoute;
      });
    })
  }



}
