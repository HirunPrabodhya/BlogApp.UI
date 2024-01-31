import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit,OnDestroy{
  loginForm:FormGroup;
  passwordType : string = 'password';
  eye:string = 'fa-eye-slash';
   _showPassword : boolean = false;
   loginUserSubscription$:Subscription;
  constructor(private fb:FormBuilder,private service: UserService, private router:Router, private tokenService: TokenService) {
    
  }
  
  ngOnInit(): void {
      this.loginForm = this.fb.group({
          email:['',[Validators.required,Validators.email]],
          password:['',Validators.required]
      }); 
  }
  get email():AbstractControl | null{
      return this.loginForm.get('email');
  }
  get password():AbstractControl | null{
    return this.loginForm.get('password');
  }

  login(){
    if(this.loginForm.valid){
         
    this.loginUserSubscription$ = this.service.loginUser(this.loginForm.value)
                              .subscribe({
                                next: (result:{[key:string]:string})=>{
                                  
                                    this.tokenService.storeToken(result["token"]);  
                                    this.navigateToHomePage();
                                },
                                error: err=>{ 
                                  alert(err.error.message);
                                  console.log(err);
                                }
                              });
    }

    
  }
  togglePassword(){
    this._showPassword = !this._showPassword;
   if(this._showPassword){
          this.passwordType = 'text';
   }
   else{
        this.passwordType = 'password';
   }
  }
  navigateToHomePage(){
      this.loginForm.reset();
    this.router.navigate([''])
               .then(()=>location.reload());
  }
  ngOnDestroy(): void {
   this.loginUserSubscription$?.unsubscribe();
  }

}
