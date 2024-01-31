import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../../user/service/token.service';
import { Post } from '../../common/common';
import { PostService } from '../../post/service/post.service';
import { UserService } from 'src/app/user/service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit,OnDestroy{
      username:string | null = null;
      userRole:string = '';
      getUserNameSubscription$:Subscription;
      constructor(private tokenService:TokenService,private userService:UserService) {
      }
  
  ngOnInit(): void {
    const userId = Number(this.tokenService.userId);
    this.userRole = String(this.tokenService.userRole);
   this.getUserNameSubscription$ =  this.userService.getUserName(userId)
                                            .subscribe({
                                              next:(result:{[key:string]:string})=>this.username = result['firstName'],
                                              error:err=>console.log(err)
                                              
                                        })        
  }
      sharingClck(){
        if(navigator.share){
            navigator.share(
              {
                title:'My copied link here',
                url:'http://localhost:4200/setting/posts'
              }
            ).then(()=>{
              console.log('Thanks for sharing');
              
            }).catch(console.error);
        }
      }
      ngOnDestroy(): void {
        this.getUserNameSubscription$?.unsubscribe();
      }
}
