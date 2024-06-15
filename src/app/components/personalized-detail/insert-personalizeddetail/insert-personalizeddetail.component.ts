import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { Entrepreneurship } from '../../../models/entrepreneurship';
import { PersonalizedDetailService } from '../../../services/personalized-detail.service';
import { EntrepreneurshipService } from '../../../services/entrepreneurship.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../../app.component';
import { UploadService } from '../../../services/upload.service';
import { PersonalizedDetail } from '../../../models/personalizeddetail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-insert-personalizeddetail',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    AppComponent,
    RouterLink
  ],
  templateUrl: './insert-personalizeddetail.component.html',
  styleUrl: './insert-personalizeddetail.component.css',
})
export class InsertPersonalizeddetailComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pd: PersonalizedDetail = new PersonalizedDetail();
  listEntrepreneurships: Entrepreneurship[] = [];
  imageUrl: SafeUrl | null = null; 
  selectedFile: File | null = null;
  serverImageUrl: string | null = null;
  selectedFileName: string = '';

  idPD: number = 0;
  idDetallePersonalizado: number = 0;
  edicion: boolean = false;

  constructor(
    private pdS: PersonalizedDetailService,
    private eS: EntrepreneurshipService,
    private formBuilder: FormBuilder,
    private uS: UploadService,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idPD = data['id'];
      this.edicion = data['id'] != null;
      if (this.edicion) {
        this.init();
      }
    });

    this.form = this.formBuilder.group({
      NombreEmprendimiento: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(100)]],
      precio: [
        '',
        [
          Validators.required,
          Validators.max(50),
          Validators.pattern(/^\d*\.?\d{0,2}$/),
          Validators.min(1)
        ],
      ],
      imageFile: [null, Validators.required],
    });
    this.eS.list().subscribe((data) => {
      this.listEntrepreneurships = data;
    });
  }

  upload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(file)
      );
      this.selectedFileName = file.name;
    }
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.form.patchValue({
        imageFile: file
      });
    } else {
      this.selectedFileName = ''; 
      this.form.patchValue({
        imageFile: null
      });
    }
  }
  
  

  get lookImagen(): SafeUrl | string | null {
    return this.serverImageUrl || this.imageUrl;
  }

  registrar(): void {
    if (this.form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.uS.uploadFile(formData).subscribe((response) => {
        const imageUrl = response.url;

        this.pd.namePersonalizedDetail = this.form.value.descripcion;
        this.pd.additionalPricePersonalizedDetail = this.form.value.precio;
        this.pd.entrepreneurships.id = this.form.value.NombreEmprendimiento;
        this.pd.imagePersonalizedDetail = imageUrl;

        if (this.edicion) {
          this.pd.idPersonalizedDetail = this.idPD;
          this.pdS.update(this.pd).subscribe((data) => {
            this.pdS.list().subscribe((data) => {
              data.sort(
                (a, b) => a.idPersonalizedDetail - b.idPersonalizedDetail
              );
              this.pdS.setList(data);
            });
            this.mostrarMensaje(false);
            this.router.navigate(['/personalizedDetail']);
          });
        } else {
          this.pdS.insert(this.pd).subscribe((data) => {
            this.pdS.list().subscribe((data) => {
              data.sort(
                (a, b) => a.idPersonalizedDetail - b.idPersonalizedDetail
              );
              this.pdS.setList(data);
            });
            this.mostrarMensaje(false);
            this.router.navigate(['/personalizedDetail']);
          });
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.mostrarMensaje(true);
    }
  }

  mostrarMensaje(esError: boolean) {
    let mensaje = esError
      ? '¡Ha ocurrido un error!, verificar los datos'
      : '¡Has registrado exitosamente un nuevo detalle personalizado!';
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

  init() {
    this.pdS.listId(this.idPD).subscribe((data) => {
      if (data) {
        
        this.form.setValue({
          NombreEmprendimiento: data.entrepreneurships?.id || null,
          descripcion: data.namePersonalizedDetail,
          precio: data.additionalPricePersonalizedDetail,
          imageFile:null,
        });
        if (data.imagePersonalizedDetail) {
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
            data.imagePersonalizedDetail
          );
        }
        this.idPD = data.idPersonalizedDetail;
      }
    });
  }

  step = -1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
