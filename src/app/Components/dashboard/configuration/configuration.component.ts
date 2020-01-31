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
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  CompanyList: any;
  i: number;
  company;
  auditList;
  audit;
  configList;
  conf;
  conf1;
  conf2;
  conf3;
  conf4;
  conf5;
  conf6;
  conf1Number;
  conf2Number;
  conf3Number;
  conf4Number;
  conf5Number;
  conf6Number;
  confNumber: [];
  configObject: any = {
    "startingRow": "",
    "startingColumn": "",
    "endingColumn": "",
    "numColumnsToProcess": "6",
    "auditSessionId": "",
    "userFullNameIndex": "",
    "userNameIndex": "",
    "userCreationDateIndex": "",
    "startDateIndex": "",
    "lastLogOnDateIndex": "",
    "userEndDateIndex": ""
  };
  arr: any[];
  controlList: any;
  checkObject: any;



  constructor(public router:Router,public auth: AuthService, public confirmationService: ConfirmationService, public toastr: ToastrService, public dialog: MatDialog, public rest: RestService, public http: HttpClient) { }

  ngOnInit() {
    this.rest.findFormsByUserId(localStorage.getItem("userId")).subscribe((data:any) => {
      debugger;
           this.controlList = data;
       
         console.log("control===="+this.controlList);
         //console.log(this.controlList.filter((item) => item=== "2"));   
         //var task_names = this.controlList.map((task) => task==="1" );       
       
        var myKeys = Object.keys(this.controlList);
        console.log("keys===="+myKeys);
        var matchingKey = myKeys.indexOf("7") !== -1;
        console.log("match===="+matchingKey);
        

        var matchingKeys:any = myKeys.filter(function(key){ return key.indexOf("7") !== -1 });
        console.log("matchkeys===="+matchingKeys);
        console.log(this.controlList[matchingKeys]);
        this.checkObject=this.controlList[matchingKeys];
      //   var matchingValues = matchingKeys.map(function(key){ return this.controlList[key] });
      //   console.log("matchval===="+matchingValues);
         }
         );
    this.rest.getCompanyList().subscribe((data: {}) => {

      this.CompanyList = data;
    });
    this.rest.getConfigList().subscribe((data: {}) => {

      this.configList = data;
      console.log(this.configList);
    });
  }

  onChange(event) {
    console.log(this.company);
    this.rest.auditSessionFindByClient(this.company).subscribe((data: {}) => {

      this.auditList = data;

    });
  }
  changeValue(id: number, property: string, event: any) {
    debugger;
    console.log(event.target.value);

    if (this.configList[id].id === "userFullNameIndex") {
      this.configObject.userFullNameIndex = event.target.value;
    }
    if (this.configList[id].id === "userNameIndex") {
      this.configObject.userNameIndex = event.target.value;
    }
    if (this.configList[id].id === "userCreationDateIndex") {
      this.configObject.userCreationDateIndex = event.target.value;
    }
    if (this.configList[id].id === "startDateIndex") {
      this.configObject.startDateIndex = event.target.value;
    }
    if (this.configList[id].id === "lastLogOnDateIndex") {
      this.configObject.lastLogOnDateIndex = event.target.value;
    }
    if (this.configList[id].id === "userEndDateIndex") {
      this.configObject.userEndDateIndex = event.target.value;
    }
    console.log(this.configObject);
    // for(this.i=0;this.i<this.configList;this.i++)
    // {
    //   if(this.configList[0].id==="userFullNameIndex"){
    //     this.configObject.userFullNameIndex=
    //   }
    // }

  }
  // onChangeConf(event){
  //   this.configObject

  // }  

  onChangeAudit(event) {
    console.log(this.audit);
    this.configObject.auditSessionId = this.audit;
    this.rest.configFindBySessionId(this.audit).subscribe((data: any) => {
      console.log(data);
      // this.configObject = data; 
      if (data) {

        this.configObject.startingRow = data.startingRow;
        this.configObject.startingColumn = data.startingColumn;
        this.configObject.endingColumn = data.endingColumn;
      }

    }, (err: HttpErrorResponse) => {


      this.toastr.error('', "No Configuration Found! Add New One!");
      this.configObject.startingRow = "";
      this.configObject.startingColumn = "";
      this.configObject.endingColumn = "";

    }

    );

  }
   countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}
isEmpty(val){
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}
  saveConfig() {
    this.arr=[
      this.configObject.userFullNameIndex,
      this.configObject.userNameIndex,
      this.configObject.userCreationDateIndex,
      this.configObject.startDateIndex,
      this.configObject.lastLogOnDateIndex,
      this.configObject.userEndDateIndex 
   ];
  
  //  for(this.i=0; this.i<this.arr.length;this.i++)
  //  {
  //     if(this.countInArray(this.arr, this.arr[this.i])>1){
  //     this.toastr.error('', 'No Two Values Should Match!');
  //     break;
  //      }
  //  }
    if(!this.isEmpty(this.company) && !this.isEmpty(this.audit) && !this.isEmpty(this.configObject.userFullNameIndex)
     && !this.isEmpty(this.configObject.userNameIndex)   && !this.isEmpty(this.configObject.userCreationDateIndex)
     && !this.isEmpty(this.configObject.startDateIndex)  && !this.isEmpty(this.configObject.lastLogOnDateIndex)
     && !this.isEmpty(this.configObject.userEndDateIndex)  && !this.isEmpty(this.configObject.startingRow)
     && !this.isEmpty(this.configObject.startingColumn) && !this.isEmpty(this.configObject.endingColumn) 
      && this.countInArray(this.arr, this.configObject.userFullNameIndex)===1
      && this.countInArray(this.arr, this.configObject.userNameIndex)===1
      && this.countInArray(this.arr, this.configObject.userCreationDateIndex)===1
      && this.countInArray(this.arr, this.configObject.startDateIndex)===1
      && this.countInArray(this.arr, this.configObject.lastLogOnDateIndex)===1
      && this.countInArray(this.arr, this.configObject.userEndDateIndex)===1){
   
 
    // console.log(this.conf1);
    // console.log(this.conf2);
    // console.log(this.conf3);
    // console.log(this.conf4);
    // console.log(this.conf5);
    // console.log(this.conf6);
    // console.log(this.conf1Number);
    // console.log(this.conf2Number);
    // console.log(this.conf3Number);
    // console.log(this.conf4Number);
    // console.log(this.conf5Number);
    // console.log(this.conf6Number);

    //     if(this.conf1==="userFullNameIndex")
    //     {
    // this.configObject.userFullNameIndex=this.conf1Number;
    //     }
    //     else if(this.conf2==="userFullNameIndex")
    //     {
    // this.configObject.userFullNameIndex=this.conf2Number;
    //     }
    //     else if(this.conf3==="userFullNameIndex")
    //     {
    // this.configObject.userFullNameIndex=this.conf3Number;
    //     }
    //     else if(this.conf4==="userFullNameIndex")
    //     {
    // this.configObject.userFullNameIndex=this.conf4Number;
    //     }
    //     else if(this.conf5==="userFullNameIndex")
    //     {
    // this.configObject.userFullNameIndex=this.conf5Number;
    //     }
    //     else
    //     {
    //       this.configObject.userFullNameIndex=this.conf6Number;
    //     }
    //     if(this.conf1==="userNameIndex")
    //     {
    // this.configObject.userNameIndex=this.conf1Number;
    //     }
    //     else if(this.conf2==="userNameIndex")
    //     {
    // this.configObject.userNameIndex=this.conf2Number;
    //     }
    //     else if(this.conf3==="userNameIndex")
    //     {
    // this.configObject.userNameIndex=this.conf3Number;
    //     }
    //     else if(this.conf4==="userNameIndex")
    //     {
    // this.configObject.userNameIndex=this.conf4Number;
    //     }
    //     else if(this.conf5==="userNameIndex")
    //     {
    // this.configObject.userNameIndex=this.conf5Number;
    //     }
    //     else
    //     {
    //       this.configObject.userNameIndex=this.conf6Number;
    //     }
    //     if(this.conf1==="userCreationDateIndex")
    //     {
    // this.configObject.userCreationDateIndex=this.conf1Number;
    //     }
    //     else if(this.conf2==="userCreationDateIndex")
    //     {
    // this.configObject.userCreationDateIndex=this.conf2Number;
    //     }
    //     else if(this.conf3==="userCreationDateIndex")
    //     {
    // this.configObject.userCreationDateIndex=this.conf3Number;
    //     }
    //     else if(this.conf4==="userCreationDateIndex")
    //     {
    // this.configObject.userCreationDateIndex=this.conf4Number;
    //     }
    //     else if(this.conf5==="userCreationDateIndex")
    //     {
    // this.configObject.userCreationDateIndex=this.conf5Number;
    //     }
    //     else
    //     {
    //       this.configObject.userCreationDateIndex=this.conf6Number;
    //     }
    //     if(this.conf1==="startDateIndex")
    //     {
    // this.configObject.startDateIndex=this.conf1Number;
    //     }
    //     else if(this.conf2==="startDateIndex")
    //     {
    // this.configObject.startDateIndex=this.conf2Number;
    //     }
    //     else if(this.conf3==="startDateIndex")
    //     {
    // this.configObject.startDateIndex=this.conf3Number;
    //     }
    //     else if(this.conf4==="startDateIndex")
    //     {
    // this.configObject.startDateIndex=this.conf4Number;
    //     }
    //     else if(this.conf5==="startDateIndex")
    //     {
    // this.configObject.startDateIndex=this.conf5Number;
    //     }
    //     else
    //     {
    //       this.configObject.startDateIndex=this.conf6Number;
    //     }
    //     if(this.conf1==="lastLogOnDateIndex")
    //     {
    // this.configObject.lastLogOnDateIndex=this.conf1Number;
    //     }
    //     else if(this.conf2==="lastLogOnDateIndex")
    //     {
    // this.configObject.lastLogOnDateIndex=this.conf2Number;
    //     }
    //     else if(this.conf3==="lastLogOnDateIndex")
    //     {
    // this.configObject.lastLogOnDateIndex=this.conf3Number;
    //     }
    //     else if(this.conf4==="lastLogOnDateIndex")
    //     {
    // this.configObject.lastLogOnDateIndex=this.conf4Number;
    //     }
    //     else if(this.conf5==="lastLogOnDateIndex")
    //     {
    // this.configObject.lastLogOnDateIndex=this.conf5Number;
    //     }
    //     else
    //     {
    //       this.configObject.lastLogOnDateIndex=this.conf6Number;
    //     }
    //     if(this.conf1==="userEndDateIndex")
    //     {
    // this.configObject.userEndDateIndex=this.conf1Number;
    //     }
    //     else if(this.conf2==="userEndDateIndex")
    //     {
    // this.configObject.userEndDateIndex=this.conf2Number;
    //     }
    //     else if(this.conf3==="userEndDateIndex")
    //     {
    // this.configObject.userEndDateIndex=this.conf3Number;
    //     }
    //     else if(this.conf4==="userEndDateIndex")
    //     {
    // this.configObject.userEndDateIndex=this.conf4Number;
    //     }
    //     else if(this.conf5==="userEndDateIndex")
    //     {
    // this.configObject.userEndDateIndex=this.conf5Number;
    //     }
    //     else
    //     {
    //       this.configObject.userEndDateIndex=this.conf6Number;
    //     }

    console.log(this.configObject);
    this.rest.addConfigForAudit(this.configObject).subscribe((data: {}) => {

     if(data){
       console.log(data);
      this.toastr.success('', 'Configuration updated!');
      //location.reload();
      this.router.navigate(['dashboard/sessions']);
     }           
    });
  }
    else{
      this.toastr.error('', 'Enter all required fields & No Two Values Should Match!');
    }
  }

}
