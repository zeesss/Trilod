import { Observable } from 'rxjs';
import { ConfirmationService } from './../confirmation/confirmation.service';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { AuthService } from 'src/app/Components/services/auth/auth.service';

import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { resolve } from 'url';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { PaginatePipe, PaginationControlsComponent } from 'ngx-pagination';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  personList: Array<any>;
  updateBody = {
    "id": "",
    "firstName": "",
    "middleName": "",
    "lastName": "",
    "email": "",
    "isActive": Boolean
  };
  UsersList: any[];
  editField: any;
  controlList: any;
  checkObject: any;
  selected: any;
  constructor(public auth: AuthService, public confirmationService: ConfirmationService, public toastr: ToastrService, public dialog: MatDialog, public rest: RestService, public http: HttpClient) { }

  ngOnInit() {
    this.rest.findFormsByUserId(localStorage.getItem("userId")).subscribe((data: any) => {
      debugger;
      this.controlList = data;

      console.log("control====" + this.controlList);
      //console.log(this.controlList.filter((item) => item=== "2"));
      //var task_names = this.controlList.map((task) => task==="1" );

      var myKeys = Object.keys(this.controlList);
      console.log("keys====" + myKeys);
      var matchingKey = myKeys.indexOf("2") !== -1;
      console.log("match====" + matchingKey);


      var matchingKeys: any = myKeys.filter(function (key) { return key.indexOf("2") !== -1 });
      console.log("matchkeys====" + matchingKeys);
      console.log(this.controlList[matchingKeys]);
      this.checkObject = this.controlList[matchingKeys];
      //   var matchingValues = matchingKeys.map(function(key){ return this.controlList[key] });
      //   console.log("matchval===="+matchingValues);
    }
    );
    this.rest.getUsersList().subscribe((data: any) => {
      debugger;
      this.UsersList = data;
      this.personList = this.UsersList;
      console.log(this.UsersList);
    }
    );

  }
  changeValue(id: number, property: string, event: any) {

    this.editField = event.target.textContent;

  }
  updateList(userId: any, id: number, property: string, event: any) {
    if (confirm("Are you sure to edit the record?")) {
      debugger;
      const editField = event.target.textContent;
      const checkField = event.target.checked;
      this.personList[id][property] = editField;
      this.updateBody = this.UsersList.filter((items) => items.id === userId)[0];
      console.log(this.updateBody);
      //this.updateBody.id=controlId;
      if (property === "fname") {
        this.updateBody.firstName = editField;
      }
      if (property === "lname") {
        this.updateBody.lastName = editField;
      }
      if (property === "email") {
        this.updateBody.email = editField;
      }

      if (property === "isActive") {
        this.updateBody.isActive = checkField;
      }


      this.rest.updateUser(this.updateBody).subscribe((data: any) => {
        // debugger;
        //      alert(JSON.stringify(data));

        // alert(data);
        console.log(data);
        if (data.error === null) {
          this.toastr.success('', 'Record updated!');
        }
        else {
          this.toastr.error('', data.error);
        }


      },
        (err: HttpErrorResponse) => {


          this.toastr.error('', 'Failed!');

        }
      );
    }
  }
  newUser() {
    this.openDialog();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogUserAdd, {
      width: '600px',
      data: { name: 'hi', animal: "hi" }
    });


  }
  editUserRole(id) {
    localStorage.setItem("userIdRoleEdit", id);
    this.openDialogEdit();

  }
  openDialogEdit(): void {
    let dialogRef = this.dialog.open(DialogUserEdit, {
      width: '600px',
      data: { name: 'hi', animal: "hi" }
    });


  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'

})
export class DialogUserAdd {
  firstName;
  userName;
  middleName;
  lastName;
  email;
  isActive;
  filtered;
  selected;
  saveBody = {
    "userName": "",
    "firstName": "",
    "middleName": "",
    "lastName": "",
    "email": "",
    "isActive": true

  };
  listToPush: Array<any> = [];
  trueList: Array<any> = [];

  pushObject = {
    "roleId": ""
  };
  rolesList: any;
  optionsMap: any;

  constructor(
    private router: Router,
    public http: HttpClient, public toastr: ToastrService,

    public rest: RestService,
    public dialogRef: MatDialogRef<DialogUserAdd>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.rest.getRolesList().subscribe((data: any) => {
      debugger;
      this.rolesList = data;

      console.log(this.rolesList);

    }
    );

  }

  onNoClick(): void {
    this.dialogRef.close();
    //this.auth.logout();
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  changeValue(id, event: any) {
    debugger;
    const checkField = event.target.checked;
    // alert(id +"====="+checkField);
    if (checkField === true) {
      this.pushObject.roleId = id;
      this.listToPush.push(this.pushObject);

      //alert(this.listToPush);
      console.log(this.listToPush);
      this.pushObject = { "roleId": "" };
    }
    if (checkField === false) {
      //this.pushObject.roleId=id;
      this.listToPush.splice(this.listToPush.findIndex(x => x.roleId == id), 1);
      //alert(this.listToPush);
      console.log(this.listToPush);
      this.pushObject = { "roleId": "" };
    }

  }
  onYesClick(): void {
    alert(this.selected);
    //     if(!this.isEmpty(this.userName) && !this.isEmpty(this.firstName) && !this.isEmpty(this.lastName) && !this.isEmpty(this.email) )

    //   {
    //     this.saveBody.userName=this.userName;
    //     this.saveBody.firstName=this.firstName;
    //     this.saveBody.lastName=this.lastName;
    //     this.saveBody.email=this.email;
    //     if(this.isEmpty(this.middleName))
    //     this.saveBody.middleName="";
    //     else{
    //      this.saveBody.middleName=this.middleName;
    //     }
    //    if(this.isActive===undefined)
    //    this.saveBody.isActive=false;
    //    else if(this.isActive===false)
    //    this.saveBody.isActive=false;
    //    else
    //    this.saveBody.isActive=true;

    //    console.log(this.saveBody);
    //    debugger;
    //     this.rest.addUser(this.saveBody).subscribe((data : any)=>{
    //       console.log(data);
    //       debugger;
    //       if(data.error===null){
    //         this.rest.addUserRoleList(data.id, this.listToPush).subscribe((data : any)=>{
    //           console.log(data);
    //           if(data.saved==="successful"){
    //         this.dialogRef.close();
    //         this.toastr.success('', 'Record Saved!');
    //         location.reload();
    //           }
    //         });

    //       }
    //       else{
    //         this.dialogRef.close();
    //         this.toastr.error('', 'Sorry! Something went wrong!');
    //       }


    // }
    // ,
    // (err : HttpErrorResponse)=>{


    // this.toastr.error('', 'Failed!');

    // });

    //   }

    //   else
    //   {
    //     this.toastr.error('', 'Enter all required fields!');
    //   }
  }

}
@Component({
  selector: 'dialog-overview-example-dialog-edit',
  templateUrl: 'dialog-overview-example-dialog-edit.html'

})
export class DialogUserEdit {
  firstName;
  userName;
  middleName;
  lastName;
  email;
  isActive;
  filtered;
  saveBody = {
    "userName": "",
    "firstName": "",
    "middleName": "",
    "lastName": "",
    "email": "",
    "isActive": true

  };
  listToPush: Array<any> = [];
  newArray: Array<any> = [];
  pushObject = {
    "roleId": ""
  };
  rolesList: Array<any> = [];
  optionsMap: Array<any> = [];
  selectedRolesList: Array<any> = [];
  newArray1: any[];

  constructor(
    private router: Router,
    public http: HttpClient, public toastr: ToastrService,

    public rest: RestService,
    public dialogRef: MatDialogRef<DialogUserEdit>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.rest.getRolesList().subscribe((data: any) => {
      debugger;
      this.rolesList = data;

      console.log(this.rolesList);

    }
    );
    this.rest.getRolesByUserId(localStorage.getItem("userIdRoleEdit")).subscribe((data: any) => {
      debugger;
      this.selectedRolesList = data;

      console.log(this.selectedRolesList);
      for (var i = 0; i < this.rolesList.length; i++) {

        var ismatch = false; // we haven't found it yet

        for (var j = 0; j < this.selectedRolesList.length; j++) {

          if (this.rolesList[i].id == this.selectedRolesList[j].roleId) {
            // we have found this.officeLIST[i]] in this.office, so we can stop searching
            ismatch = true;
            this.rolesList[i].checked = true;//  checkbox status true
            this.newArray.push(this.rolesList[i]);
            break;
          }//End if
          // if we never find this.officeLIST[i].office_id in this.office, the for loop will simply end,
          // and ismatch will remain false
        }
        // add this.officeLIST[i] to newArray only if we didn't find a match.
        if (!ismatch) {
          this.rolesList[i].checked = false;//  checkbox status false
          this.newArray.push(this.rolesList[i]);
        } //End if
      }
      console.log(this.newArray);
    }
    );
    debugger;


  }

  onNoClick(): void {
    this.dialogRef.close();
    //this.auth.logout();
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  changeValue(id, event: any) {
    debugger;
    const checkField = event.target.checked;
    // alert(id +"====="+checkField);
    if (checkField === true) {
      this.pushObject.roleId = id;
      this.listToPush.push(this.pushObject);

      //alert(this.listToPush);
      console.log(this.listToPush);
      this.pushObject = { "roleId": "" };
    }
    if (checkField === false) {
      //this.pushObject.roleId=id;
      this.listToPush.splice(this.listToPush.findIndex(x => x.roleId == id), 1);
      //alert(this.listToPush);
      console.log(this.listToPush);
      this.pushObject = { "roleId": "" };
    }

  }

  onYesClick(): void {
    debugger;
    this.newArray1 = this.newArray.filter((items) => items.checked === true);
    //  alert(this.newArray1);
    // alert(this.listToPush);

    this.rest.addUserRoleList(localStorage.getItem("userIdRoleEdit"), this.listToPush).subscribe((data: any) => {
      if (data) {
        this.dialogRef.close();
        this.toastr.success('', 'Record Saved!');
        location.reload();
      }
      else {
        this.dialogRef.close();
        this.toastr.error('', 'Sorry! Something went wrong!');
      }
    });

  }








}



