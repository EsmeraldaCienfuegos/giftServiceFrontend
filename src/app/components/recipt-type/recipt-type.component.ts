import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router'; 
import { ListReciptTypeComponent } from './list-recipt-type/list-recipt-type.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-recipt-type',
  standalone: true,
  imports: [RouterOutlet,
    ListReciptTypeComponent,
    MatTabsModule
  ],
  templateUrl: './recipt-type.component.html',
  styleUrl: './recipt-type.component.css'
})
export class ReciptTypeComponent implements OnInit{

  
  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {
    
  }



}
