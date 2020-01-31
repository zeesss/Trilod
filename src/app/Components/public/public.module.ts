import { FileTypeComponent } from './../dashboard/file-type/file-type.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxLoadingModule} from 'ngx-loading';
import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatToolbarModule
} from '@angular/material';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { FirstLoginComponent } from './first-login/first-login.component';
import { ControlTaskComponent } from './../dashboard/control-task/control-task.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
const publicRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  // {
  //   path: 'file-type',
  //   component: FileTypeComponent,
  // },
 
{
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
  },
{
    path: 'updatepassword',
    component: UpdatepasswordComponent,
  },
  {
      path: 'verifyCode',
      component: VerifyCodeComponent,
    },
  {
      path: 'firstLogin',
      component: FirstLoginComponent,
    }];
@NgModule({
  declarations: [LoginComponent, ForgotpasswordComponent, UpdatepasswordComponent, VerifyCodeComponent,FirstLoginComponent, VerifyCodeComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(publicRoutes),
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FormsModule,
    NgxLoadingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
