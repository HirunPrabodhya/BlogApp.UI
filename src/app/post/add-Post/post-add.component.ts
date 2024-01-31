import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category/service/category.service';
import { Category, Post, PostDetail } from '../../common/common';
import { TokenService } from '../../user/service/token.service';
import { PostService } from '../service/post.service';
import { UrlCustomeValidation } from '../../common/imageUrl.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostEditComponent implements OnInit,OnDestroy{
    post:Post;
    postId:number;
    userId:number | null;
    postForm:FormGroup;
    categories:Category[] = [];
    formTitle:string = '';
    publishDateShow:boolean = false;
    errorMessage:string = "";
    paramSubscription$:Subscription;
    addPostSubscription$:Subscription;
    categorySubscription$:Subscription;
    getPostSubscription$:Subscription;
    updatePostSubscription$:Subscription;
    deletePostSubscription$:Subscription;

    editorConfig:AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
      translate: 'no',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial'
    }
    constructor(private fb: FormBuilder,private activeRouter: ActivatedRoute,
                private postService:PostService,private categoryService:CategoryService,
                private tokenService: TokenService,private router:Router) {
    }
    ngOnInit(): void {
            this.postForm = this.fb.group({
                    title: ['',Validators.required],
                    summary:['',Validators.required],
                    category:['',Validators.required],
                    thumbnail:['',[Validators.required,UrlCustomeValidation.urlValidation]],
                    content: ['',Validators.required],
                    publishDate:['']
            });
            this.getCategories();

             this.paramSubscription$ =  this.activeRouter.paramMap.subscribe(
                                              param=>{
                                                this.postId = Number(param.get('id'));
                                                  this.getPost()
                                              }
                                            );
            this.userId = this.tokenService.userId;
    }
get title(): AbstractControl | null{
return this.postForm.get('title');
}
get category(): AbstractControl | null{
  return this.postForm.get('category');
}
get summary(): AbstractControl | null{
return this.postForm.get('summary');
}
get thumbnail(): AbstractControl | null{
return this.postForm.get('thumbnail');
}
get content(): AbstractControl | null{
return this.postForm.get('content');
}
get publishDate(): AbstractControl | null{
return this.postForm.get('publishDate');
} 
getCategories(){
 this.categorySubscription$ =  this.categoryService.getCategories()
                                                    .subscribe({
                                                        next:result=> this.categories = result,
                                                        error:err=> this.errorMessage = err.error.message
                                                    })
}
getPost(){

  if(this.postId === 0){
    this.publishDateShow = true;
    this.formTitle = 'Add Post';
    this.publishDate?.setValidators(Validators.required);
  }
  else{
    this.publishDateShow = false;
        this.formTitle = 'Edit Post';
      this.getPostSubscription$ =  this.postService.getPost(this.postId)
                                                  .subscribe({
                                                    next:(result:PostDetail)=>this.displayPost(result),
                                                    error:err=>this.errorMessage = err.error.message
                                                  })
  }
}
displayPost(post:PostDetail){
    this.postForm.patchValue({
      title:post.title,
      summary:post.summary,
      thumbnail:post.thumbnail,
      content:post.content,
      publishDate:post.publishDate
    })
}

  createUpdatePost(){
        if(this.postForm.valid){
          if(this.postForm.dirty){
            let postValue:Post = {
              title: this.title?.value,
              content: this.content?.value,
              summary: this.summary?.value,
              thumbnail:this.thumbnail?.value,
              publishDate:this.publishDate?.value,
              updateDate:null,
              userId: this.userId,
              categoryId:this.category?.value
            }
           let post = {...this.post,...postValue};
          if(this.postId === 0){
              this.addPostSubscription$ = this.postService.addPost(post)
                                                          .subscribe({
                                                            next:result=>{
                                                                  console.log(result);
                                                                  this.saveComplete();
                                                            },
                                                            error:err=>this.errorMessage = err.error.message
                                                          })  
          }
          else{
            this.updatePostSubscription$ =  this.postService.updatePost(this.postId,post)
                                                            .subscribe({
                                                              next:result=>{
                                                                  alert(result['message']);
                                                                  this.saveComplete(); 
                                                              },
                                                              error:err=>this.errorMessage = err.error.message
                                                            })
            }
          }
        }
  }
  
  removePost(){
    if(confirm('Do you want to delete the post?')){
      this.deletePostSubscription$ = this.postService.deletePost(this.postId)
                                          .subscribe({
                                            next:(result:{[key:string]:string})=>{
                                                  alert(result['message']);
                                                  this.saveComplete();  
                                            },
                                            error:err=>this.errorMessage = err.error.message
                                            
                                          })
    }
  }
  saveComplete(){
    this.postForm.reset();
    this.router.navigate(['/settings/posts']);
  }
  ngOnDestroy(): void {
    this.paramSubscription$?.unsubscribe()
    this.addPostSubscription$?.unsubscribe()
    this.categorySubscription$?.unsubscribe()
    this.getPostSubscription$?.unsubscribe()
    this.updatePostSubscription$?.unsubscribe()
    this.deletePostSubscription$?.unsubscribe()
  }

   
}
