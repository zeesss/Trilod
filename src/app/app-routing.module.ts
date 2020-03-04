import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {AuthGuardService} from './Components/services/authGaurd/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Route [] = [
  {
    path: 'dashboard',
    loadChildren: './Components/dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuardService],
  },
    {
      path: '',
      loadChildren: './Components/public/public.module#PublicModule',
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {onSameUrlNavigation: "reload"})
    ,
    // RouterModule.forRoot(routes, {useHash:true}),
    // RouterModule.forRoot(
    //   routes,
    //   { enableTracing: true } 
    // ),
    FormsModule, 
    ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
