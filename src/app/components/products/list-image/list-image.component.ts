import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router } from '@angular/router'; 
import { ProductImageDetailService } from '../../../services/product-image-detail.service';
import { routes } from '../../../app.routes';




@Component({
  selector: 'app-list-image',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule

  ],
  templateUrl: './list-image.component.html',
  styleUrl: './list-image.component.css'
})
export class ListImageComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  idProduct: number = 0;

  constructor( 
    private router: Router, 
    private fb: FormBuilder,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    routes
    this.route.params.subscribe((data: Params) => {
      this.idProduct = data['idProduct'];
      this.edicion = data['idProduct'] != null;

      // this.init();
    });
    this.form = this.fb.group({
      imgPrincipal: ['', Validators.required],
      image2: ['', Validators.required],
      image3:['',Validators.required],
      image4: [ '', Validators.required ] 
    });
  }
}
