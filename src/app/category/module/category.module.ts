import { NgModule } from '@angular/core';
import { CategoryComponent } from '../category-home/category.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../Guard/auth.guard';
import { CategoryResolver } from '../resolver/category.resolver';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
@NgModule({
  declarations: [
    CategoryComponent,
    EditCategoryComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'',
        component:CategoryComponent,
        resolve:{
          categoryListData:CategoryResolver
        }
      },
      {
        path:':id/edit',
        component:EditCategoryComponent
      }
     
    ])
  ]
})
export class CategoryModule { }
