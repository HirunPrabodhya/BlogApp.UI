import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { CategoryService } from '../service/category.service';
import { categoryResolved } from 'src/app/common/common';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver  {
  
  constructor(private categoryService:CategoryService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<categoryResolved> {
    return this.categoryService.getCategories()
    .pipe(
      map(categories=>({categories:categories,error:''}))
      ,catchError(error=>{
        var message = `Retrieval error: ${error}`
          return of({categories:[],error:message})
      })
    )

   
  }
}
