import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/common/common';
import { PostService } from 'src/app/post/service/post.service';
import { TokenService } from 'src/app/user/service/token.service';

@Component({
  selector: 'app-post-setting',
  templateUrl: './post-setting.component.html',
  styleUrls: ['./post-setting.component.css']
})
export class PostSettingComponent implements OnInit,OnDestroy{
  
  writerPost:Post[];
  errorMessage:string = '';
  getPostByUserIdSubscription$:Subscription;
  constructor(private tokenService:TokenService,private postService:PostService) {
   
  }
  
ngOnInit(): void {
const userId = this.tokenService.userId;
    if(userId){
    this.getPostByUserIdSubscription$ = this.postService.getPostByUserId(userId)
                                                        .subscribe({
                                                          next:(result:Post[])=>this.writerPost = result,
                                                          error:err=>this.errorMessage = err.error.message
                                                        })
    }                  
}
ngOnDestroy(): void {
  this.getPostByUserIdSubscription$?.unsubscribe();
}


}
