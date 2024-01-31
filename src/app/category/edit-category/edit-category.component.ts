import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlCustomeValidation } from 'src/app/common/imageUrl.validator';
import { CategoryService } from '../service/category.service';
import { Category } from 'src/app/common/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit,OnDestroy{
  pageTitle:string = "Add Category";
  categoryForm:FormGroup;
  categoryId:number = 0;
  errorMessage:string = '';
  getCategorySubscription$:Subscription;
  getparamIdSubscription$:Subscription;
  addCategorySubscription$:Subscription;
  updateCategorySubscription$:Subscription;
  deleteCategorySubscription$:Subscription;
  constructor(private activeRouter:ActivatedRoute,private router:Router, private fb:FormBuilder,private categoryService:CategoryService) {
  }
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required],
      imageUrl:['',[Validators.required,UrlCustomeValidation.urlValidation]]
    })
    this.getparamIdSubscription$ = this.activeRouter.paramMap.subscribe(params=>{
                                          this.categoryId = Number(params.get('id'));
                                    });
        this.getCategory();
  }
  get name():AbstractControl | null{
   return this.categoryForm.get('name');
  }
  get description():AbstractControl | null{
    return this.categoryForm.get('description');
  }
  get imageUrl():AbstractControl | null{
    return this.categoryForm.get('imageUrl');
  }
  getCategory(){
      if(this.categoryId === 0){
        this.pageTitle = 'Add Category';
      }
      else{
        this.pageTitle = 'Edit Category';
        this.getCategorySubscription$ = this.categoryService.getCategory(this.categoryId)
                                                            .subscribe({
                                                                  next:(result:Category)=>this.displayCategory(result),
                                                                  error:err=> this.errorMessage = err
                                                            });
    }
  }
  displayCategory(category:Category){
        this.categoryForm.patchValue({
          name:category.name,
          description:category.description,
          imageUrl:category.imageUrl
        });
      
  }
  addCategory(){
    if(this.categoryForm.valid){
      if(this.categoryId === 0)
      {
        this.addCategorySubscription$ = this.categoryService.addCategory(this.categoryForm.value)
                                                            .subscribe({
                                                              next:(result:{[key:string]:string})=>{
                                                                    alert(result['message']);
                                                                    this.onSaveCompleted();
                                                              },
                                                              error:err=>this.errorMessage = err.error.message
                                                              
                                                            });
      }
      else{
        if(this.categoryForm.dirty){
           this.updateCategorySubscription$ =  this.categoryService.updateCategory(this.categoryId,this.categoryForm.value)
                                                                    .subscribe({
                                                                      next:(result:{[key:string]:string})=>{
                                                                          alert(result['message']);
                                                                          this.onSaveCompleted()
                                                                      },
                                                                      error:err=>this.errorMessage = err.error.errorMessage
                                                                    })
        }
      }  
    }
  }
  removeCategory(){
  this.deleteCategorySubscription$ =  this.categoryService.deleteCategory(this.categoryId)
                                                          .subscribe({
                                                            next:(result:{[key:string]:string})=>{
                                                              alert(result['message']);
                                                              this.onSaveCompleted();
                                                            }
                                                          })
  }
  onSaveCompleted(){
    this.categoryForm.reset();
      this.router.navigate(['/categories']);
  }
  ngOnDestroy(): void {
    this.getCategorySubscription$?.unsubscribe();
    this.getparamIdSubscription$?.unsubscribe();
    this.addCategorySubscription$?.unsubscribe();
    this.updateCategorySubscription$?.unsubscribe();
    this.deleteCategorySubscription$?.unsubscribe();
  }
}
