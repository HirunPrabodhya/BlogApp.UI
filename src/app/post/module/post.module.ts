import { NgModule } from '@angular/core';
import { PostComponent } from '../post-home/post.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PostDetailComponent } from '../detail-post/post-detail.component';
import { PostEditComponent } from '../add-Post/post-add.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PostResolver } from '../resolver/post.resolver';
import { PostGuard } from '../Guard/post.guard';

@NgModule({
  declarations: [
    PostComponent,
    PostDetailComponent,
    PostEditComponent
  ],
  imports: [
    SharedModule,
    AngularEditorModule,
    RouterModule.forChild([
      {
        path:'',
        component:PostComponent,
        resolve:{postListData:PostResolver}
      },
      {
        path:':id',
        component:PostDetailComponent
      },
      {
        path:':id/edit', 
        component:PostEditComponent,
        canActivate:[PostGuard]
      }
    ])
  ]
})
export class PostModule { }
