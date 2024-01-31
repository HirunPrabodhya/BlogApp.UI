import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorRequest } from '../model/author-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthrequestService {

  constructor(private http:HttpClient) { }
  getRequest(file:File,formValue:AuthorRequest):Observable<{[key:string]:string}>{
      const formData = new FormData();
      formData.append("firstName",formValue.firstName)
      formData.append("lastName",formValue.lastName)
      formData.append("email",formValue.email)
      formData.append("bio",formValue.bio)
      formData.append("cvFile",file);
    return this.http.post<{[key:string]:string}>(`${environment.postUrl}/users/userrequiest`,formData);
  }
}
