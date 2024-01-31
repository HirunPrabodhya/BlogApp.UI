import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  payload:any;
  constructor(private service:CookieService) {
    
      this.payload = this.decodeToken();
   }
  getToken():string | null{
      return this.service.get('authorization');
  }
  logout():void{
      this.service.delete('authorization');
    
  }
  isLogin(): boolean{
    return !!this.getToken();
  }
  storeToken(token:string):void{
    this.service.set('authorization',`Bearer ${token}`);
    console.log(this.getToken());
  }
  decodeToken():any{
    const helper = new JwtHelperService();
    let token : string | null = this.getToken();
    if(token){
       return helper.decodeToken(token);
    }
    return null;
      
  }
  
  get userRole():string | null{
    if(this.payload){
      return this.payload.role;
    }
    return null;
  }
  get userId():number | null{
    if(this.payload){
        return this.payload.nameid;
    }
    return null;
  }
}
