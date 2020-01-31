import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { AuthService } from '../../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
email:any;

  constructor(public auth:AuthService,public rest:RestService,private router:Router,public toastr: ToastrService) { }

  ngOnInit() {
  }
getCode(){
    debugger;
    //this.forgotpasswordBody.Username=this.username;
     this.rest.forgotpassword(this.email).subscribe((data : any)=>{

               //alert(data);
               console.log(data);
               if(data.success=="true")
               {
                   this.toastr.success('', 'Email Sent!');
                   localStorage.setItem('emailToResetPassword',this.email);
                   this.router.navigate(['verifyCode']); 
               }
               else{
                this.toastr.error('', "Some Error Occurred!");
               }
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

      
      this.toastr.error('Invalid email', 'Failed!');
      //this.auth.logout();
    });

}

cancel(){
  this.router.navigate(['']); 
}
}
