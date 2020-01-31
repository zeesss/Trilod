import { UtilsService } from './../../services/utils/utils.service';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Inject, Input } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-session-audit',
  templateUrl: './session-audit.component.html',
  styleUrls: ['./session-audit.component.scss']
})
export class SessionAuditComponent implements OnInit {
  RequestedData;
  RequestedDate;
  FulFillDate;
  CompanyList;
  PopulationList;
  file;
  editField;
  code;
  codes; FileTypeList;
  RuleTypeList;
  personList
  ControlTaskList;
  company;
  address;
  name;
  city;
  state;
  zip;
  startDate;
  endDate;
  populationObject;
  fieldArray: Array<any> = [];
  newAttribute = {
    "control": "",
    "description": ""
  };
  auditbody = {
    "clientIdTransient": "",
    "auditName": "",
    "fiscalStartDate": "",
    "fiscalEndDate": "",
    "address": "",
    "city": "",
    "state": "",
    "zip": ""

  };
  //  newAttribute={
  //   "id":"",
  //   "code":"",
  //   "description":"",
  // "businessRule":"",
  // "ruleType":"",

  // "fileTypeId":{"id":"",
  // "name":""},
  // "isActive":"",
  // "createDate":""
  // };
  updateBody = {
    "id": "",
    "code": "",
    "description": "",
    "businessRule": "",
    "ruleType": "",

    "fileTypeId": {
      "id": "",
      "name": ""
    },
    "isActive": true
  };
  sessionObject: { "clientIdTransient": number; "auditName": string; "fiscalStartDate": string; "fiscalEndDate": string; "address": string; "city": string; "state": string; "zip": string; "auditFileList": any; };

  constructor(public utils: UtilsService, public dialog: MatDialog, public toastr: ToastrService, public router: Router, public rest: RestService) { }

  ngOnInit() {
    this.rest.getCompanyList().subscribe((data: {}) => {

      this.CompanyList = data;
    });
    this.rest.getFileTypeList().subscribe((data: {}) => {

      this.FileTypeList = data;

      console.log(this.FileTypeList);

    });
    this.rest.getRuleTypeList().subscribe((data: {}) => {

      this.RuleTypeList = data;

      console.log(this.RuleTypeList);

    });
    this.rest.getPopulationList().subscribe((data: {}) => {

      this.PopulationList = data;

      console.log(this.PopulationList);

    });
    this.rest.getControlTaskListOnlyActive().subscribe((data: {}) => {

      this.ControlTaskList = data;
      this.personList = this.ControlTaskList;
      this.code = this.ControlTaskList.map(function (a) { return a.code; });
      console.log(this.code);
    });
  }
  onChange(value) {
    debugger;
    this.company = this.CompanyList.filter((items) => items.clientName === value)[0];
    this.address = this.CompanyList.filter((items) => items.clientName === value)[0].address;
    console.log(this.address);
  }
  changeValue(id: number, property: string, event: any) {
    debugger;
    this.editField = event.target.textContent;
    if (property === "description")
      this.newAttribute.description = this.editField;
    // else
    // this.newAttribute.businessRule=this.editField;
  }
  changeValue1(id: number, property: string, event: any) {
    debugger;
    this.editField = event.target.textContent;

  }
  changeValuePopulation(id: number, property: string, event: any) {
    debugger;
    this.editField = event.target.textContent;

  }
  updateList(controlId: any, id: number, property: string, event: any) {
    if (confirm("Are you sure to edit the record?")) {
      debugger;
      const editField = event.target.textContent;
      var selectField = event.target.value;
      const checkField = event.target.checked;
      this.personList[id][property] = editField;
      this.updateBody = this.ControlTaskList.filter((items) => items.id === controlId)[0];
      console.log(this.updateBody);
      if (property === "code") {
        this.updateBody.code = editField;
      }
      if (property === "businessRule") {
        this.updateBody.businessRule = editField;
      }
      if (property === "description") {
        this.updateBody.description = editField;
      }
      if (property === "ruleType") {
        selectField = selectField.split(": ").pop();
        this.updateBody.ruleType = selectField;
      }
      if (property === "fileType") {
        selectField = selectField.split(": ").pop();
        this.file = this.FileTypeList.filter((items) => items.name === selectField)[0];
        this.updateBody.fileTypeId.id = this.file.id;
        this.updateBody.fileTypeId.name = this.file.name;
      }
      if (property === "isActive") {
        this.updateBody.isActive = checkField;
      }

    }
  }
  // getrow(){
  //   this.newAttribute=this.ControlTaskList.filter((items) => items.code === this.newAttribute.code)[0];
  //   console.log(this.newAttribute);
  // }
  openDialog(): void {
    let dialogRef = this.dialog.open(AddFile, {
      width: '600px',
      data: { name: 'hi', animal: "hi" }
    });


  }
  addFieldValue() {
    debugger;
    console.log(this.newAttribute);
    this.fieldArray.push(this.newAttribute);
    console.log(this.fieldArray);
    this.newAttribute = {
      "control": "",
      "description": ""
    };
    this.openDialog();
    //   this.newAttribute = {"id":"",
    //   "code":"",
    //   "description":"",
    // "businessRule":"",
    // "ruleType":"",

    // "fileTypeId":{"id":"",
    // "name":""},
    // "isActive":"",
    // "createDate":""};
    console.log(this.newAttribute);
  }
  deleteControl(i, rowId) {
    if (confirm("Are you sure to delete the record?")) {
      this.toastr.success('', 'Record deleted!');
      this.fieldArray.splice(rowId, 1);
    }




  }
  remove(id: any, rowId) {

    this.deleteControl(id, rowId);

  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  saveAudit() {
    //alert(this.utils.dateFormat(this.endDate));
    if (!this.isEmpty(this.name) && !this.isEmpty(this.address) && !this.isEmpty(this.startDate)
      && !this.isEmpty(this.endDate) && !this.isEmpty(this.city) && !this.isEmpty(this.state) && !this.isEmpty(this.zip)) {
      this.auditbody.address = this.address;
      this.auditbody.auditName = this.name;
      this.auditbody.city = this.city;
      this.auditbody.clientIdTransient = localStorage.getItem("clientId");
      this.auditbody.fiscalEndDate = this.endDate;
      this.auditbody.fiscalStartDate = this.startDate;
      this.auditbody.state = this.state;
      this.auditbody.zip = this.zip;
      console.log(this.auditbody);
      this.rest.saveAuditSession(this.auditbody).subscribe((data: any) => {
        if (data.responseCode === "00") {
          this.toastr.success('', 'Audit Session Saved!');
          location.reload();
        }
        else {
          this.toastr.error('', 'Some Error Occurred!');
        }
      });
    }
    else {
      this.toastr.error('', 'Enter all required fields!');

    }

  }
  addSessionAudit() {
    if (!this.isEmpty(this.company) && !this.isEmpty(this.name) && !this.isEmpty(this.address) && !this.isEmpty(this.startDate)
      && !this.isEmpty(this.endDate) && this.fieldArray.length > 0) {
      if (this.startDate < this.endDate) {
        console.log(this.RequestedData);
        console.log(this.RequestedDate);
        console.log(this.FulFillDate);
        console.log(this.fieldArray);
        console.log(this.company);
        console.log(this.address);
        console.log(this.name);
        console.log(this.startDate);
        console.log(this.endDate);
        this.sessionObject = {
          "clientIdTransient": this.company.id,
          "auditName": this.name,
          "fiscalStartDate": this.startDate,
          "fiscalEndDate": this.endDate,
          "address": this.address,
          "city": this.company.city,
          "state": this.company.state,
          "zip": this.company.zip,
          "auditFileList": []
        }
        this.populationObject = {
          "requestedData": this.RequestedData,
          "requestedDate": this.RequestedDate,
          "fulfillDate": this.FulFillDate,
          "auditSessionId": ""
        }
        this.rest.addSessionAudit(this.sessionObject).subscribe((data: any) => {
          if (data) {
            const sessionid = data.id;
            this.populationObject.auditSessionId = data.id;
            console.log(data);
            this.rest.addControlTaskFromSessionAudit(sessionid, this.fieldArray).subscribe((data: any) => {
              console.log(data);
              if (data) {
                this.rest.addPopulation(this.populationObject).subscribe((data: any) => {
                  console.log(data);
                  if (data) {

                    this.toastr.success('', 'Record Saved!');

                    this.router.navigate(['dashboard']);

                  }

                });
              }

            });


          }
          if (data.error) {

            this.toastr.error('', data.error);

          }
        });
      }
      else {
        this.toastr.error('', 'Start Date should be less than End Date!');
      }
    }
    else {
      this.toastr.error('', 'Enter all required fields!');

    }
  }



}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'

})
export class AddFile {
  tfn1;
  tfn2;

  constructor(
    private router: Router,
    public http: HttpClient, public toastr: ToastrService,

    public rest: RestService,
    public dialogRef: MatDialogRef<AddFile>,
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

  }

}

