import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorRequestComponent } from '../request-form/author-request.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AuthorRequestComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
            path:'',
            component:AuthorRequestComponent   
      },
      
    ])
  ]
})
export class AuthRequestModule { }
