import { NgModule } from '@angular/core';
import { SettingComponent } from '../../setting-home/setting.component';
import { PostSettingComponent } from '../../post-setting/post-setting.component';
import { UserSettingComponent } from '../../user-setting/user-setting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SettingComponent,
    PostSettingComponent,
    UserSettingComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      
      {
        path:'',
        component:SettingComponent,
        children:[
                {
                  path:'profile',
                  component:UserSettingComponent
                },
                {
                  path:'posts',
                  component:PostSettingComponent
                },
                {
                  path:'',
                  redirectTo:'posts',
                  pathMatch:'full'
                }
        ]
      },
      
     
    ])
  ]
})
export class SettingModule { }
