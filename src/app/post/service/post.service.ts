import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Post, PostDetail, postUrl } from '../../common/common';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  //create
  addPost(post:Post):Observable<{[key:string]:string}>{
    
    return this.http.post<{[key:string]:string}>(`${environment.postUrl}/Posts`,post);
  }
  //get
  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.postUrl}/posts`);
  }
  getPost(id:number):Observable<PostDetail>{
    return this.http.get<PostDetail>(`${environment.postUrl}/posts/${id}`);
  }
  getPostByCategoryId(categoryId:number):Observable<Post[]>{
      return this.http.get<Post[]>(`${environment.postUrl}/posts/getpostbycategoryid/${categoryId}`);
  }
  getPostByUserId(userId:number):Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.postUrl}/posts/getpostbyuserid/${userId}`);
  }
  updatePost(postId:number,post:Post):Observable<{[key:string]:string}>{
      return this.http.put<{[key:string]:string}>(`${environment.postUrl}/posts/${postId}`,post);
  }
  deletePost(id:number):Observable<{[key:string]:string}>{
          return this.http.delete<{[key:string]:string}>(`${environment.postUrl}/posts/${id}`);
  }
}
