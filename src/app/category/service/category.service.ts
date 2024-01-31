import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, postUrl } from '../../common/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
     
  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]>{
        return this.http.get<Category[]>(`${environment.postUrl}/Categories`);
  }
  getCategory(id:number): Observable<Category>{
      return this.http.get<Category>(`${environment.postUrl}/Categories/${id}`);
  }
  addCategory(category:Category):Observable<{[key:string]:string}>{
      return this.http.post<{[key:string]:string}>(`${environment.postUrl}/Categories`,category);
  }
  updateCategory(id:number,category:Category):Observable<{[key:string]:string}>{
      return this.http.put<{[key:string]:string}>(`${environment.postUrl}/Categories/${id}`,category);
  }
  deleteCategory(id:number):Observable<{[key:string]:string}>{
    return this.http.delete<{[key:string]:string}>(`${environment.postUrl}/Categories/${id}`);
  }

}
