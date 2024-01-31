import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../category/service/category.service';
import { Category, Post } from '../../common/common';
import { TokenService } from '../../user/service/token.service';
import { PostService } from '../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit,OnDestroy{ 
      role:string|null;
      posts:Post[] = [];
      errorMessage:string = '';
      categories:Category[] = [];
      getDataSubscription$:Subscription;
      getCategoriesSubscription$:Subscription;
      getPostCategoryId$:Subscription;
      constructor(private categoryService: CategoryService,private service:PostService,private activeRouter:ActivatedRoute, private tokenService:TokenService) {}
 
  ngOnInit(): void {
        this.getCategory();                
      this.getDataSubscription$ =  this.activeRouter.data.subscribe(data=>{
                                            const resolvedData = data["postListData"];
                                            this.errorMessage = resolvedData.error;
                                            this.posts = resolvedData.posts;
                                            
                                      })
        this.role = this.tokenService.userRole;
  }
  getCategory(){
    this.getCategoriesSubscription$ =  this.categoryService.getCategories()
                                                .subscribe({
                                                  next:(res:Category[])=>{
                                                      this.categories = res
                                                  },
                                                  error:err=>this.errorMessage = err.error.message   
                                                  
                                                });
  }
  getCategoryPost(id:number,category:string){
      this.errorMessage = "";
     this.getPostCategoryId$ = this.service.getPostByCategoryId(id)
                                          .subscribe({
                                            next:(result:Post[])=>this.posts = result,
                                            error:err=>{
                                              this.errorMessage = `${err.error.message} in ${category}`
                                                
                                            }
                                                          
                                          })
  }
  ngOnDestroy(): void {
      this.getDataSubscription$?.unsubscribe()
      this.getCategoriesSubscription$?.unsubscribe()
      this.getPostCategoryId$?.unsubscribe()
  }
}
