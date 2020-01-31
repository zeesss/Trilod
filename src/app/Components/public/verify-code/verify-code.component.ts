import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { AuthService } from '../../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
code:any;
  constructor(public auth:AuthService,public rest:RestService,private router:Router,public toastr: ToastrService) { }

  ngOnInit() {
  }
  verify(){
    debugger;
    //this.forgotpasswordBody.Username=this.username;
     this.rest.verifyCode(localStorage.getItem('emailToResetPassword'),this.code).subscribe((data : any)=>{

               //alert(data);
               console.log(data);
               if(data.success=="false")
               {
                 this.toastr.error('', data.error);
               }
               else{
                this.toastr.success('', 'Password Has Been Sent To Your Email Address!');
                this.router.navigate(['']); 

               }
                   //this.toastr.success('', 'Email Sent!');
                
                   //this.router.navigate(['']); 
               debugger;
              //  localStorage.setItem('response',data.ResponseCode);
              //  if(localStorage.getItem('response')==='00')
              //  {
              //      this.toastr.success('Success ', 'Check email to reset password');
              //      this.auth.logout();

              //  }        
              //  if(localStorage.getItem('response')==='001')
              //  {
              //      this.toastr.error('Unexpected Error occurred, Try Again', 'Failed!');
              //      this.auth.logout();

              //  }        

    }
    ,
    (err : HttpErrorResponse)=>{

      
      this.toastr.error('Invalid code', 'Failed!');
      //this.auth.logout();
    });

}

cancel(){
  this.router.navigate(['']); 
}
}
