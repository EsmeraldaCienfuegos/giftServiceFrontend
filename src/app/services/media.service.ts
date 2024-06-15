import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private hhtp: HttpClient
  ) { }

  uploadFile(formData:FormData): Observable<any>{
    return this.hhtp.post('http://localhost:8084/media/upload', formData);
  }
}

  