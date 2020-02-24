import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
//import {UtilsService} from '../utils/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RestService } from '../rest/rest.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginBody={
    "userName":"",
    "password":""
  }
isLoginError : boolean = false;
  constructor(public rest:RestService,private router:Router,public toastr: ToastrService) { }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('userName',username);
    formData.append('password', password);
    // this.loginBody.userName=username;
    // this.loginBody.password=password;
      debugger;
      // this.router.navigate(['dashboard']);
      // this.toastr.success('Welcome ', 'Success!');
           //this.rest.login(this.loginBody).subscribe((data : any)=>{
            this.rest.login(formData).subscribe((data : any)=>{

               //alert(data);
               debugger;
               console.log(data);
      // localStorage.setItem('access_token',data.access_token);
      // localStorage.setItem('ProviderId',data.ProviderId);
      // localStorage.setItem('password', password);
      // localStorage.setItem('firstName', data.FirstName);
      // localStorage.setItem('lastName', data.LastName);
      if(data.authentication==="failed"){
        this.isLoginError = true;
      
      this.toastr.error('Invalid user or password', 'Login Failed!');
        this.router.navigate(['']);
      }
            // if (data.LastLoginTime==="" || data.IsForceChangePassword=== true)
            // {
            //     this.toastr.success('Change Password Immediately', 'Success!');
            //     this.router.navigate(['updatepassword']);
                
            // }
            if(data.authentication==="successful" && data.isPasswordChanged==="true")
            {
              localStorage.setItem("token", data.token);
              localStorage.setItem("userId", data.userId);
              localStorage.setItem("clientId", "1");
       this.router.navigate(['dashboard']);
       //this.router.navigate(['dashboard/sessions']);
      this.toastr.success('Welcome ', 'Success!');
      
            } 
            if(data.authentication==="successful" && data.isPasswordChanged==="false")
            {
              localStorage.setItem("token", data.token);
              localStorage.setItem("userId", data.userId);
       this.router.navigate(['updatepassword']);
       //this.router.navigate(['dashboard/sessions']);
      this.toastr.success('Welcome ', 'Change Your Password First!');
      
            } 

    }
    ,
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
      
      this.toastr.error('Invalid user or password', 'Login Failed!');
    });
   
 

         // localStorage.setItem('currentUser', JSON.stringify({user: username}));
          localStorage.setItem('currentUser', username);
          
  }

  logout() {
      debugger;
    //   console.log(localStorage.getItem('ProviderId'));
    // this.rest.logout(localStorage.getItem('ProviderId')).subscribe((data : any)=>{

    //            //alert(data);
    //            debugger;
    //   localStorage.setItem('response',data.ResponseCode);
    //         if(localStorage.getItem('response')==='00')
    //            {
    //                this.toastr.success('Success ', 'Logged Out!');
    //                localStorage.clear();
    //                this.router.navigate(['']);

    //            }
            

    // });
    this.rest.logout().subscribe((data : any)=>{

               //alert(data);
               debugger;
     // localStorage.setItem('response',data.ResponseCode);
     this.toastr.success('Success ', 'Logged Out!');
                   localStorage.clear();
                   this.router.navigate(['']);
            // if(data.pageName==='login')
            //    {
            //        this.toastr.success('Success ', 'Logged Out!');
            //        localStorage.clear();
            //        this.router.navigate(['']);

            //    }
            

    });
    // localStorage.clear();
    // this.router.navigate(['']);
  }
  isLoggedIn() {
    return localStorage.getItem('currentUser');
  }
}
