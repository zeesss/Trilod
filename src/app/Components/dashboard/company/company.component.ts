import { Observable } from 'rxjs';
import { ConfirmationService } from './../confirmation/confirmation.service';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { resolve } from 'url';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  CompanyList;
  editField: string;
  person: any;
  personList: Array<any>;
  awaitingPersonList: Array<any>;
  clientName;
  description;
  status;
  address;
  city;
  state;
  zip;
  updateBody = {
    "clientName": "",
    "description": "",
    "status": "",
    "address": "",
    "city": "",
    "state": "",
    "zip": ""
  };
  controlList: any;
  checkObject: any;

  constructor(public toastr: ToastrService, public dialog: MatDialog, public rest: RestService, public http: HttpClient) { }

  ngOnInit() {
    this.rest.findFormsByUserId(localStorage.getItem("userId")).subscribe((data: any) => {
      debugger;
      this.controlList = data;

      console.log("control====" + this.controlList);
      //console.log(this.controlList.filter((item) => item=== "2"));
      //var task_names = this.controlList.map((task) => task==="1" );

      var myKeys = Object.keys(this.controlList);
      console.log("keys====" + myKeys);
      var matchingKey = myKeys.indexOf("3") !== -1;
      console.log("match====" + matchingKey);


      var matchingKeys: any = myKeys.filter(function (key) { return key.indexOf("3") !== -1 });
      console.log("matchkeys====" + matchingKeys);
      console.log(this.controlList[matchingKeys]);
      this.checkObject = this.controlList[matchingKeys];
      //   var matchingValues = matchingKeys.map(function(key){ return this.controlList[key] });
      //   console.log("matchval===="+matchingValues);
    }
    );
    this.rest.getCompanyList().subscribe((data: {}) => {
      // debugger;
      //      alert(JSON.stringify(data));
      this.CompanyList = data;
      this.personList = this.CompanyList;
      console.log(this.CompanyList);

    }

    );

  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  updateList(controlId: any, id: number, property: string, event: any) {
    if (!this.isEmpty(event.target.checked)) {
      var editField = "somestring";
    }

    if (this.isEmpty(editField)) {
      this.toastr.error('', 'Value should not be empty!');
    }
    else {
      if (confirm("Are you sure to edit the record?")) {
        debugger;
        const editField = event.target.textContent;

        const checkField = event.target.checked;
        this.personList[id][property] = editField;
        this.updateBody = this.CompanyList.filter((items) => items.id === controlId)[0];
        console.log(this.updateBody);
        //this.updateBody.id=controlId;
        if (property === "clientName") {
          this.updateBody.clientName = editField;
        }
        if (property === "description") {
          this.updateBody.description = editField;
        }
        if (property === "address") {
          this.updateBody.address = editField;
        }
        if (property === "city") {
          this.updateBody.city = editField;
        }
        if (property === "state") {
          this.updateBody.state = editField;
        }
        if (property === "zip") {
          this.updateBody.zip = editField;
        }

        if (property === "status") {
          this.updateBody.status = checkField;
        }


        this.rest.updateCompany(this.updateBody).subscribe((data: {}) => {
          // debugger;
          //      alert(JSON.stringify(data));

          // alert(data);
          console.log(data);
          if (data) {
            this.toastr.success('', 'Records updated!');
          }


        },
          (err: HttpErrorResponse) => {


            this.toastr.error('', 'Failed!');

          }
        );
      }
      else {
        location.reload();
      }
    }
  }

  remove(id: any, rowId) {
    //this.confirmed=this.openConfirmationDialog1();
    //this.openConfirmationDialog1();
    this.deleteControl(id, rowId);
    //this.personList.splice(rowId, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {

    this.editField = event.target.textContent;

  }


  deleteControl(i, rowId) {
    if (confirm("Are you sure to delete the record?")) {
      this.rest.deleteControlTask(i).subscribe((data: {}) => {
        // debugger;
        //      alert(JSON.stringify(data));


        console.log(data);
        if (data) {
          this.toastr.success('', 'Record deleted!');
          this.personList.splice(rowId, 1);
        }

      },
        (err: HttpErrorResponse) => {


          this.toastr.error('', 'Failed!');

        });
    }
  }
  newControl() {
    this.openDialog();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog3, {
      width: '600px',
      height: '700px',
      data: { name: 'hi', animal: "hi" }
    });


  }


}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'

})
export class DialogOverviewExampleDialog3 {
  clientName;
  description;
  status;
  address;
  city;
  state;
  zip;
  filtered;
  saveBody = {
    "clientName": "",
    "description": "",
    "status": true,
    "address": "",
    "city": "",
    "state": "",
    "zip": "",
    "auditSessionList": []
  };
  constructor(
    private router: Router,
    public http: HttpClient, public toastr: ToastrService,

    public rest: RestService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog3>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onNoClick(): void {
    this.dialogRef.close();
    //this.auth.logout();
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  onYesClick(): void {
    if (!this.isEmpty(this.clientName) && !this.isEmpty(this.description) && !this.isEmpty(this.address) && !this.isEmpty(this.city)
      && !this.isEmpty(this.zip) && !this.isEmpty(this.state)) {
      if (this.state.length > 2) {
        this.toastr.error('', 'only two characters allowed in state!');
      }
      else {
        debugger;
        this.saveBody.clientName = this.clientName;
        this.saveBody.description = this.description;
        this.saveBody.address = this.address;

        this.saveBody.city = this.city;
        this.saveBody.state = this.state;
        this.saveBody.zip = this.zip;
        if (this.status == undefined)
          this.saveBody.status = false;
        else
          this.saveBody.status = true;


        console.log(this.saveBody);
        debugger;
        this.rest.addCompany(this.saveBody).subscribe((data: any) => {
          console.log(data);
          if (data) {
            this.dialogRef.close();
            this.toastr.success('', 'Record Saved!');
            location.reload();

          }
          else {
            this.dialogRef.close();
            this.toastr.error('', 'Sorry! Something went wrong!');
          }


        }
          ,
          (err: HttpErrorResponse) => {


            this.toastr.error('', 'Failed!');

          });
      }
    }
    else {
      this.toastr.error('', 'Enter all required fields!');
    }

  }

}


