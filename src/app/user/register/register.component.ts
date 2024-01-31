import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  UserService } from '../service/user.service';
import { User, UserType } from '../../common/common';
import { CustomeValidation } from '../../common/custom.validator';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy{
  registerForm:FormGroup;
  userTypes:UserType[];
  isBioShow:boolean =false;
  userTypeIdSubscription$?:Subscription;
  userTypeSubscription$:Subscription;
  addUserSubscription$:Subscription;
  constructor(private fb:FormBuilder, private service: UserService) {
  }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      passwordGroup: this.fb.group({
        password:['',Validators.required],
        confirmPassword:['',Validators.required],
      },{validator:CustomeValidation.PasswordMacher}),
      bio: [''],
      userTypeId:['',Validators.required]
    })
    
    this.getUserTypes();
   this.userTypeIdSubscription$ = this.userTypeId?.valueChanges.subscribe(
                                      value=>this.changeField(value)
                                  )
    
  }
  get firstName():AbstractControl | null{
    return this.registerForm.get('firstName');
  }
  get lastName():AbstractControl | null{
      return this.registerForm.get('lastName');
  }
  get email():AbstractControl | null{
    return this.registerForm.get('email');
  }
  get password():AbstractControl | null{
    return this.registerForm.get('passwordGroup.password');
  }
  get confirmPassword():AbstractControl | null{
    return this.registerForm.get('passwordGroup.confirmPassword');
  }
  get bio():AbstractControl | null{
    return this.registerForm.get('bio');
  }
  get userTypeId():AbstractControl | null{
    return this.registerForm.get('userTypeId');
  }
  getUserTypes(){
   this.userTypeSubscription$ = this.service.getUserTypes()
                                  .subscribe({
                                    next:(res:UserType[])=>{
                                      this.userTypes = res
                                      console.log(this.userTypes)
                                      
                                    },
                                    error:err=>console.log(err)
                                  })
  }
  changeField(value:number){
      if(value === 1){
          this.isBioShow = false;
        }
     else{
        this.isBioShow = true;
        this.bio?.setValidators(Validators.required);
        this.bio?.updateValueAndValidity();
     }
  }
  addUser(){
      if(this.registerForm.valid){
            console.log(this.registerForm.value);
          let user:User =  {
                              firstName: this.firstName?.value,
                              lastName: this.lastName?.value,
                              bio: this.bio?.value,
                              email: this.email?.value,
                              password: this.password?.value,
                              userTypeId:this.userTypeId?.value
                            }  
         this.addUserSubscription$ = this.service.addUsers(user)
                                      .subscribe({
                                        next:  res =>{
                                          console.log(res['message'])
                                            alert(res['message'])
                                            this.registerForm.reset();
                                        },
                                        error: err => console.log(err)
                                        });
      }
  }
  ngOnDestroy(): void {
    this.userTypeIdSubscription$?.unsubscribe();
    this.userTypeSubscription$?.unsubscribe();
    this.addUserSubscription$?.unsubscribe();
  }
}
