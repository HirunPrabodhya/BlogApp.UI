import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostDetail } from '../../common/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../service/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit,OnDestroy{
  postDetail:PostDetail;
 author:string; 
 getPostSubscription$:Subscription;
  constructor(private activateRouter:ActivatedRoute,private postService:PostService) {
  }
  
  ngOnInit(): void {
    this.activateRouter.paramMap.subscribe(
      param=> {
                const id = Number(param.get('id'));
                this.getPostDetails(id)
              }
    )
  }
  getPostDetails(postId:number){
      this.getPostSubscription$ =  this.postService.getPost(postId)
                                                  .subscribe({
                                                    next:(res:PostDetail)=>{
                                                        this.postDetail = res;
                                                          this.author = res.firstName + ' ' + res.lastName;
                                                        console.log(res);
                                                      },
                                                    error: err=> console.log(err)
                                                  })
  }
  generatePDF(){
      window.print();  
  }
  ngOnDestroy(): void {
   this.getPostSubscription$?.unsubscribe();
  }
    
}
