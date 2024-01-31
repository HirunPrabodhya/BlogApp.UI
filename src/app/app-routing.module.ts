import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './category/Guard/auth.guard';

const routes: Routes = [
{
  path:'categories',
  canActivate:[AuthGuard],
  loadChildren:()=>import('./category/module/category.module')
                      .then(m=>m.CategoryModule)
},
{
  path:'posts',
  loadChildren:()=>import('./post/module/post.module')
                  .then(m=>m.PostModule)
},
{
  path: 'users',
  loadChildren: () => import('./user/module/user.module')
                  .then(m => m.UserModule)
},

{
  path:'settings',
  loadChildren:()=>import('./setting/module/setting/setting.module')
                  .then(m=>m.SettingModule)
},
{
  path:'request',
  loadChildren:()=>import('./author-request/module/auth-request.module')
                    .then(m=>m.AuthRequestModule)
},
{
  path:'welcome',
  component:WelcomeComponent
},
{
  path:'', 
  redirectTo:"welcome",
  pathMatch:"full"
},
{
  path:'**', 
  component:PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
