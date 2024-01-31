import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthrequestService } from '../service/authrequest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author-request',
  templateUrl: './author-request.component.html',
  styleUrls: ['./author-request.component.css']
})
export class AuthorRequestComponent implements OnInit,OnDestroy{
  _showPassword : boolean = false;
  passwordType : string = 'password';
  requstForm:FormGroup;
  requestSubscription$:Subscription;
  private file?:File;
  constructor(private fb:FormBuilder, private service:AuthrequestService) {
  }
  
  ngOnInit(): void {
    this.requstForm =  this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      bio:['',Validators.required]
    });
  }
  get firstName():AbstractControl | null{
    return this.requstForm.get('firstName');
  }
  get lastName():AbstractControl | null{
    return this.requstForm.get('lastName');
  }
  get email():AbstractControl | null{
    return this.requstForm.get('email');
  }
  get bio():AbstractControl | null{
    return this.requstForm.get('bio');
  }
  
 onFileUpload(event:Event):void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
    
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
  sendRequest(){
    if(this.file && this.requstForm.valid){
        this.requestSubscription$ =   this.service.getRequest(this.file,this.requstForm.value)
                                                    .subscribe({
                                                      next:(result:{[key:string]:string})=>{

                                                            alert(result['message']); 
                                                            this.requstForm.reset();
                                                      },
                                                      error:err=>{
                                                        alert(err);
                                                          
                                                      }
                                                    })
    }
       
  }
  ngOnDestroy(): void {
   this.requestSubscription$?.unsubscribe();
  }
}
