import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../user/service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
 
  constructor(private tokenService:TokenService, private router:Router) {

  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.tokenService.isLogin()){
        return true;
    }
    
      alert("you are unauthorized to access..");
      this.router.navigate(['/users/login']);
      
      return false;
    
   
  }
  
}
