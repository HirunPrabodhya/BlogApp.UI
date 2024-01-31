import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/service/category.service';
import { TokenService } from '../user/service/token.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{
 categories:any[];
 
  constructor(private service:CategoryService) {
   

  }
  ngOnInit(): void {
    //  this.service.getCategories().subscribe({
    //       next:res=>this.categories = res,
    //       error:err=>console.log(err)
          
    //  })
    
  }

}
