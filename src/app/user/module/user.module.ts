import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { UserLoginComponent } from '../user-login/user-login.component';
import { AuthGuard } from '../../category/Guard/auth.guard';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    RegisterComponent,
    UserLoginComponent,
  ],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule, 
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule.forChild([
      {
        path:'login',
        component:UserLoginComponent
      },
      {
        path:'register',
        component:RegisterComponent,
        canActivate:[AuthGuard]
      },

      
      
    ])
  ],
 
})
export class UserModule { }
