import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/common';
import { TokenService } from 'src/app/user/service/token.service';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit,OnDestroy{
  userId:number;
  user:User;
  userRole:string = '';
  passwordType : string = 'password';
  eye:string = 'fa-eye-slash';
   _showPassword : boolean = false;
   @ViewChild('userForm') userForm:NgForm;

   getUserSubscription$:Subscription;
   updateUserSubscription$:Subscription;
   deleteUserSubscription$:Subscription;

  constructor(private userService:UserService,private router:Router,
              private activeRoute:ActivatedRoute,private tokenService:TokenService) {
    
  }
  
  ngOnInit(): void {
    
        this.userId = Number(this.tokenService.userId);
        this.userRole = String(this.tokenService.userRole);
        this.getUserSubscription$ =   this.userService.getUser(this.userId)
                                                  .subscribe({
                                                    next:(result:User)=>{
                                                  
                                                      this.user = result;
                                                    },
                                                    error:err=>console.log(err)
                                                    
                                                  })
  }
  togglePassword(){
    this._showPassword = !this._showPassword;
   if(this._showPassword){
          this.passwordType = 'text';
          this.eye = 'fa-eye';
   }
   else{
        this.passwordType = 'password';
        this.eye = 'fa-eye-slash';
   }
  }
  updateUser():void{
     if(this.userForm.valid){
      this.updateUserSubscription$ = this.userService.editUser(this.user,this.userId)
                                            .subscribe({
                                                next:(result)=>{
                                                  console.log(result);
                                                  this.onSaveCompleted();
                                                },
                                                error:err=>console.log(err)
                                            })
     }
      else{
        console.log('error occurwdgh');
      }
  }
  deleteAccount(){
    if(confirm('Do you want to delete your account (your data will be lost) ?')){
        
    this.deleteUserSubscription$ = this.userService.removeUser(this.userId)
                                                  .subscribe({
                                                    next:(result:{[key:string]:string})=>{
                                                        console.log(result);
                                                        this.userService.logout();
                                                    },
                                                    error:err=>console.log(err)
                                                  })
    }
  }
  onSaveCompleted(){
    this.userForm.reset();
    this.router.navigate(['/setting/posts'])
                .then(
                  ()=>location.reload()
                );
  }
  ngOnDestroy(): void {
    this.getUserSubscription$?.unsubscribe();
    this.updateUserSubscription$?.unsubscribe();
    this.deleteUserSubscription$?.unsubscribe();
  }
}
