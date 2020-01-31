import { Observable } from 'rxjs';
import { ConfirmationService } from './../confirmation/confirmation.service';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { AuthService } from 'src/app/Components/services/auth/auth.service';

import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NgbModal, ModalDismissReasons,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { resolve } from 'url';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { PaginatePipe, PaginationControlsComponent} from 'ngx-pagination';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  personList: Array<any> ;
  updateBody={
    
    "id":"",
    "roleName":"",
  "isActive":Boolean
  };
  RolesList: any[];
  editField: any;
  controlList: any;
  checkObject: any;
  constructor(public auth:AuthService,public confirmationService:ConfirmationService, public toastr:ToastrService, public dialog:MatDialog,public rest:RestService, public http:HttpClient) { }

  ngOnInit() {
    this.rest.findFormsByUserId(localStorage.getItem("userId")).subscribe((data:any) => {
      debugger;
           this.controlList = data;
       
         console.log("control===="+this.controlList);
         //console.log(this.controlList.filter((item) => item=== "2"));   
         //var task_names = this.controlList.map((task) => task==="1" );       
       
        var myKeys = Object.keys(this.controlList);
        console.log("keys===="+myKeys);
        var matchingKey = myKeys.indexOf("1") !== -1;
        console.log("match===="+matchingKey);
        

        var matchingKeys:any = myKeys.filter(function(key){ return key.indexOf("1") !== -1 });
        console.log("matchkeys===="+matchingKeys);
        console.log(this.controlList[matchingKeys]);
        this.checkObject=this.controlList[matchingKeys];
      //   var matchingValues = matchingKeys.map(function(key){ return this.controlList[key] });
      //   console.log("matchval===="+matchingValues);
         }
         );
    this.rest.getRolesList().subscribe((data:any) => {
      debugger;
           this.RolesList = data;
         this.personList=this.RolesList;
         console.log(this.RolesList);
         }
         );
  }
  changeValue(id: number, property: string, event: any) {
    
    this.editField = event.target.textContent;
    
  }
  updateList(roleId:any,id: number, property: string, event: any) {
    if(confirm("Are you sure to edit the record?")){
    debugger;
    const editField = event.target.textContent;
    const checkField = event.target.checked;
    this.personList[id][property] = editField;
    this.updateBody=this.RolesList.filter((items) => items.id === roleId)[0];
console.log(this.updateBody);
   //this.updateBody.id=controlId;
   if(property==="name")
   {
     this.updateBody.roleName=editField;
   }
  
   if(property==="isActive")
   {
     this.updateBody.isActive=checkField;
   }
 

    this.rest.updateRole(this.updateBody).subscribe((data: {}) => {
      // debugger;
        //      alert(JSON.stringify(data));
            
       // alert(data);
            console.log(data);
            if(data){
              this.toastr.success('', 'Record updated!');
            }
            
            
          },
          (err : HttpErrorResponse)=>{
          
          
          this.toastr.error('', 'Failed!');
          
          }
          );
        }
  }
 
  newRole(){
    this.openDialog();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogRoleAdd, {
      width: '600px',
      data: { name:'hi', animal: "hi" }
    });
  
   
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'
 
})
export class DialogRoleAdd {
  code;
  roleName;
  
  isActive;
  filtered;
  saveBody={
    "roleName":"",
  "isActive":true
};
 
  constructor(
    private router: Router,
    public http:HttpClient, public toastr:ToastrService,
   
    public rest:RestService,
    public dialogRef: MatDialogRef<DialogRoleAdd>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  
     }

  onNoClick(): void {
    this.dialogRef.close();
    //this.auth.logout();
  }
  isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
  onYesClick(): void {
    if(!this.isEmpty(this.roleName) )

    {
      this.saveBody.roleName=this.roleName;
      if(this.isActive===undefined)
      this.saveBody.isActive=false;
      else if(this.isActive===false)
      this.saveBody.isActive=false;
      else
      this.saveBody.isActive=true;
      
      console.log(this.saveBody);
      debugger;
     
    this.rest.addRole(this.saveBody).subscribe((data : any)=>{
      console.log(data);
      debugger;
      if(data.error===null){
        this.dialogRef.close();
        this.toastr.success('', 'Record Saved!');
        location.reload();
        
      }
      else{
        this.dialogRef.close();
        this.toastr.error('', 'Sorry! Something went wrong!');
      }
      

}
,
(err : HttpErrorResponse)=>{


this.toastr.error('', 'Failed!');

});
  
  }

  else
  {
    this.toastr.error('', 'Enter all required fields!');
  }
  }

}
