import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { AuthService } from '../../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';




@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})
export class UpdatepasswordComponent implements OnInit {
    
username:any;
oldPassword:any;
newPassword:any;
confirmPassword:any;
changePasswordBody={
    id: "",
    password: "",
    newPassword:""
}
//pattern="(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*";
//pattern = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$";
pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})";
//pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$";
  constructor(public auth:AuthService,public rest:RestService,private router:Router,public toastr: ToastrService) { }

  ngOnInit() {
      //this.username=localStorage.getItem('currentUser');
  }
 /*  comparewithold():Boolean{
if(this.oldPassword===localStorage.getItem('password'))
return false;
else
return true;
  } */


  checkPassword(){
   
    debugger;
// alert(this.newPassword);
// alert(this.oldPassword);
// alert(localStorage.getItem("userId"));
      debugger;
      if(!(this.newPassword.match(this.pattern))) 
      {
      this.toastr.error('Password length should be above 8 and must contain atleast one upper case, one  lower case, one special character and one number', 'Failed!');

      }

      else if (this.newPassword.match(this.pattern) && this.newPassword===this.confirmPassword)
      {

       this.changePasswordBody.id=localStorage.getItem("userId");
        this.changePasswordBody.password=this.oldPassword;
        this.changePasswordBody.newPassword=this.newPassword;
      this.rest.updatePassword(this.changePasswordBody).subscribe((data : any)=>{

               //alert(data);
               debugger;
              //  localStorage.setItem('response',data.ResponseCode);
              //  alert(localStorage.getItem('response'));
              //  if(localStorage.getItem('response')==='00')
              //  {
              //      this.toastr.success('Success ', 'Password Changed!');
              //      this.auth.logout();

              //  }
              //  else if (localStorage.getItem('response')==='015'){

              //       this.toastr.error('Old Password does not match with current password', 'Failed!');
              //   }
              //alert(data.changePassword);
              //console.log(data);
              //console.log(data.changePassword);
              if(data.changePassword==='success')
              {
                this.toastr.success('Success ', 'Password Changed!');
                      this.auth.logout();
              }
              else
              {
                this.toastr.error('Old Password does not match with current password', 'Failed!');
              }

    }
    ,
    (err : HttpErrorResponse)=>{

      
      this.toastr.error('Invalid passwords', 'Failed!');
      this.auth.logout();
    });

  }
 /*    else if (this.oldPassword!==localStorage.getItem('password') && this.newPassword===this.confirmPassword){

        this.toastr.error('Password does not match with old password', 'Failed!');
    } */
  else{
      this.toastr.error('Mismatching passwords', 'Failed!');
  }
}

}
// import { Component, OnInit } from '@angular/core';
// import { RestService } from '../../services/rest/rest.service';
// import { AuthService } from '../../services/auth/auth.service';
// import {ToastrService} from 'ngx-toastr';
// import { HttpErrorResponse } from '@angular/common/http';
// import {Router} from '@angular/router';




// @Component({
//   selector: 'app-updatepassword',
//   templateUrl: './updatepassword.component.html',
//   styleUrls: ['./updatepassword.component.scss']
// })
// export class UpdatepasswordComponent implements OnInit {
    
// username:any;
// oldPassword:any;
// newPassword:any;
// confirmPassword:any;
// changePasswordBody={
//     ProviderId: "",
// 	OldPassword: "",
// 		NewPassword: "",
// 		ConfirmPassword: ""
// }
// //pattern="(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*";
// //pattern = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$";
// pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})";
// //pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$";
//   constructor(public auth:AuthService,public rest:RestService,private router:Router,public toastr: ToastrService) { }

//   ngOnInit() {
//       //this.username=localStorage.getItem('currentUser');
//   }
//  /*  comparewithold():Boolean{
// if(this.oldPassword===localStorage.getItem('password'))
// return false;
// else
// return true;
//   } */


//   checkPassword(){
   
//     debugger;

//       debugger;
//       if(!(this.newPassword.match(this.pattern))) 
//       {
//       this.toastr.error('Password length should be above 8 and must contain atleast one upper case, one  lower case, one special character and one number', 'Failed!');

//       }

//       else if (this.newPassword.match(this.pattern) && this.newPassword===this.confirmPassword)
//       {

//         this.changePasswordBody.ProviderId=localStorage.getItem('ProviderId');
//         this.changePasswordBody.OldPassword=this.oldPassword;
//         this.changePasswordBody.NewPassword=this.newPassword;
//         this.changePasswordBody.ConfirmPassword=this.confirmPassword;
//       this.rest.changePassword(this.changePasswordBody).subscribe((data : any)=>{

//                //alert(data);
//                debugger;
//                localStorage.setItem('response',data.ResponseCode);
//                if(localStorage.getItem('response')==='00')
//                {
//                    this.toastr.success('Success ', 'Password Changed!');
//                    this.auth.logout();

//                }
//                else if (localStorage.getItem('response')==='015'){

//                     this.toastr.error('Old Password does not match with current password', 'Failed!');
//                 }

//     }
//     ,
//     (err : HttpErrorResponse)=>{

      
//       this.toastr.error('Invalid passwords', 'Failed!');
//       this.auth.logout();
//     });

//   }
//  /*    else if (this.oldPassword!==localStorage.getItem('password') && this.newPassword===this.confirmPassword){

//         this.toastr.error('Password does not match with old password', 'Failed!');
//     } */
//   else{
//       this.toastr.error('Mismatching passwords', 'Failed!');
//   }
// }

// }
