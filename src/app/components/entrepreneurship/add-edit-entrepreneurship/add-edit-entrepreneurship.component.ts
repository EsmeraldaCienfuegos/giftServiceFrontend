import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntrepreneurshipService } from '../../../services/entrepreneurship.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserWeb } from '../../../models/UserWeb';

@Component({
  selector: 'app-add-edit-entrepreneurship',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-edit-entrepreneurship.component.html',
  styleUrl: './add-edit-entrepreneurship.component.css'
})
export class AddEditEntrepreneurshipComponent {
  form!: FormGroup;
  id !: number;
  constructor(private fb: FormBuilder, private eS: EntrepreneurshipService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.form = this.fb.group({
      id: [0],
      nameEntrepreneurship: ['', Validators.required],
      rucEntrepreneurship: ['', Validators.required],
      locationEntrepreneurship: ['', Validators.required],
      phoneEntrepreneurship: ['', Validators.required],
      users: [new UserWeb()],
    });
    if(this.id){
      this.eS.listId(this.id).subscribe((data) => {
        this.form.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value.users.idUser = 2; //parseInt(localStorage.getItem('idUser')!)
      if(this.id){
        this.form.value.id = this.id;
        this.eS.update(this.form.value).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }else{
        this.eS.insert(this.form.value).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate(['/entrepreneurship']);
    }
  }
}
