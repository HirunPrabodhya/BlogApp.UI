import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category, categoryResolved } from '../../common/common';
import { CategoryService } from '../service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,OnDestroy{
  categories:Category[] = [];
  errorMessage:string = '';
  getCategoriesSubscription$:Subscription;
  constructor(private activeRoute:ActivatedRoute) {
   }
 
  ngOnInit(): void {
        
     this.getCategoriesSubscription$ = this.activeRoute.data.subscribe(data=>{
                                        const resolvedData:categoryResolved = data["categoryListData"];
                                            this.errorMessage = String(resolvedData.error);
                                            this.categories = resolvedData.categories;
                                  })
  }
  ngOnDestroy(): void {
   this.getCategoriesSubscription$?.unsubscribe();
  }
  

}
