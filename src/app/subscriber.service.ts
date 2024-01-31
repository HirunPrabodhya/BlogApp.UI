import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSubscriber } from './subscriber.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http:HttpClient) { }
  //https://localhost:7011/api/Subscribers
  addSubscriber(subscriber:UserSubscriber):Observable<{[key:string]:string}>{
    return this.http.post<{[key:string]:string}>(`${environment.postUrl}/subscribers`,subscriber);
  }
}
