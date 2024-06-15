import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private url=`${base_url}/media/upload`
  private baseUrl  = `${base_url}/media`
  constructor(private http:HttpClient) { }
  

  uploadFile(formData:FormData):Observable<any>{
    return this.http.post(this.url,formData);
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

}
