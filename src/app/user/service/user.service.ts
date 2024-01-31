import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, tap, throwError } from 'rxjs';
import { Login, User, UserType } from '../../common/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router, private tokenService:TokenService) { }
  
    getUserTypes(): Observable<UserType[]>{
      return this.http.get<UserType[]>(`${environment.postUrl}/UserTypes`)
                .pipe(
                  tap(data=>console.log(data)
                  ),
                  catchError(this.ErrorHandler)
                );
    }
    addUsers(user:User):Observable<{[key:string]:string}>{
      return this.http.post<{[key:string]:string}>(`${environment.postUrl}/Users`,user)
                      .pipe(
                        tap(data=>console.log("message:" + JSON.stringify(data))),
                        catchError(this.ErrorHandler)
                        )             
    }
    getUser(userId:number):Observable<User>{
      return this.http.get<User>(`${environment.postUrl}/Users/${userId}`);
    }
    editUser(user:User,userId:number):Observable<{[key:string]:string}>{
        return this.http.put<{[key:string]:string}>(`${environment.postUrl}/Users/${userId}`,user);
    }
    removeUser(userId:number):Observable<{[key:string]:string}>{
        return this.http.delete<{[key:string]:string}>(`${environment.postUrl}/users/${userId}`)
    }
    //authentication
    loginUser(data:Login):Observable<{[key:string]:string}>{
          return this.http.post<{[key:string]:string}>(`${environment.postUrl}/Users/Authenticate`,data);
                          
    }
    getUserName(userId:number):Observable<{[key:string]:string}>{
        return this.http.get<{[key:string]:string}>(`${environment.postUrl}/Users/GetUserFirstName/${userId}`)

    }
    logout():void{
       this.tokenService.logout();
        this.router.navigateByUrl('')
                    .then(()=>location.reload());
    }


    ErrorHandler(err:HttpErrorResponse):Observable<never>{
      let errorMessage: string = "";
      if(err.error instanceof ErrorEvent){
          errorMessage = `An error occured: ${err.error.message}`;
      }
      else{
          errorMessage = `Server returned code ${err.status} errorMessage: ${err.message}`;
      }
      return throwError(()=>errorMessage);
    }
}
