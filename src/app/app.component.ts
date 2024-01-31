import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TokenService } from './user/service/token.service';
import { UserService } from './user/service/user.service';
import { Subscription } from 'rxjs';
import { CategoryService } from './category/service/category.service';
import { Category } from './common/common';
import { NgForm } from '@angular/forms';
import { SubscriberService } from './subscriber.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  username:string | null;
  categories:Category[]
  role:string | null;
  
  @ViewChild("subscriptionForm",{static:false})subForm:NgForm;
  getUserNameSubscription$:Subscription;
  getCategoriesSubscription$:Subscription;
  addSubscribers$:Subscription;
  constructor(private token:TokenService,
              private subscriberService:SubscriberService,
               private userService:UserService,
               private categoryService:CategoryService) {
  }
  
  ngOnInit(): void {
    if(this.token.isLogin()){
        const userId = this.token.userId;
        this.role = this.token.userRole;
        if(userId)
        {
                 this.getUserNameSubscription$ = this.userService.getUserName(userId)
                                                      .subscribe({
                                                        next:(result:{[key:string]:string})=>{
                                                          this.username = result['firstName'];
                                                        },
                                                        error:err=>console.log(err)
                                                        
                                                      })
        }
       
    }
    
    
  }
  getCategories(){
   this.getCategoriesSubscription$ = this.categoryService.getCategories()
                                          .subscribe({
                                            next:(result:Category[])=> this.categories = result,
                                            error:(err)=>console.log(err)
                                          })
    
  }
  addSubscribers(){
    if(this.subForm.valid){
      this.addSubscribers$ = this.subscriberService.addSubscriber(this.subForm.value)
                                                    .subscribe({
                                                      next:(result:{[key:string]:string})=>alert(result['message']),
                                                      error:(err)=>alert(err.error.message)
                                                    })
    }
  
    
  }
  signOut(){
    debugger;
    this.username = null;
    this.userService.logout();
  }
  ngOnDestroy(): void {
    this.getUserNameSubscription$?.unsubscribe();
    this.getCategoriesSubscription$?.unsubscribe();
  }

}
