import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { PostService } from '../service/post.service';
import { PostResolved } from 'src/app/common/common';

@Injectable({
  providedIn: 'root'
})
export class PostResolver {
  
  constructor(private postService:PostService) {
    
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostResolved> {
     return this.postService.getPosts()
                      .pipe(
                        map(posts=>({posts:posts,error:''})),
                        catchError(err=>{
                          var message = `Retrieval error: ${err.error.message}`
                         
                          
                          return of({posts:[],error:message})
                        })
                      )

  }
}
