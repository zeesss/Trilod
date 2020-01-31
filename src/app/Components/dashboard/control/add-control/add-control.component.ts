import { Router } from '@angular/router';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-control',
  templateUrl: './add-control.component.html',
  styleUrls: ['./add-control.component.scss']
})
export class AddControlComponent implements OnInit {
  process;
  field_name;
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
  startDate;
  endDate;
  populationObject;
  client: number;
  fieldArray: Array<any> = [];
  description;
  frequency;
  newAttribute = {
    "fieldName": "",
    "fieldType": "",
    "selectedTemplate": "",
    "templateField": ""
  };
  cDetailBody = {
    "controlIdTransient": "",
    "fieldName": "",
    "fieldType": "",
    "templateDetailEntityIdTransient": ""
    // ,
    // "template_field_name": ""
  };
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
    "isActive": true,
  };
  sessionObject: { "clientIdTransient": number; "auditName": string; "fiscalStartDate": string; "fiscalEndDate": string; "address": string; "city": string; "state": string; "zip": string; "auditFileList": any; };
  templateList: any;
  controlBody = {
    "name": "",
    "description": "",
    "frequency": "",
    "subProcessId": ""
  };
  selectedTemplate: any;
  templateFieldList: any;
  selectedTemplateField: any;
  cDetailArray: Array<any> = [];
  constructor(public toastr: ToastrService, public router: Router, public rest: RestService) { }

  ngOnInit() {
    //Has to changed with Session Value of Logged in Client Id
    //var clientId = '14';
    this.rest.getTemplateList(localStorage.getItem("clientId")).subscribe((data: any) => {
      this.templateList = data.data;
      console.log(this.templateList);
    });
  }
  onChange(value) {
    this.selectedTemplate = this.templateList.filter((items) => items.name === value)[0];
    this.newAttribute.selectedTemplate = this.selectedTemplate.name;
    //this.cDetailBody.templateDetailEntityIdTransient=this.selectedTemplate.id;
    console.log("selectedTemplate=====");
    console.log(this.selectedTemplate);
    this.rest.getTemplateDetails(this.selectedTemplate.id).subscribe((data: any) => {
      this.templateFieldList = data.data;
      console.log(this.templateFieldList);
    });

  }
  onChangeTemplateField(value) {
    this.selectedTemplateField = this.templateFieldList.filter((items) => items.columnName === value)[0];

    console.log(this.selectedTemplateField.id);
    this.newAttribute.templateField = this.selectedTemplateField.columnName;
    this.cDetailBody.templateDetailEntityIdTransient = this.selectedTemplateField.id;

    //  this.cDetailBody.template_field_name=this.selectedTemplateField.id;

  }
  // changeValue(id: number, property: string, event: any) {
  //
  //   this.editField = event.target.textContent;
  //   if(property==="description")
  //   this.newAttribute.description=this.editField;
  //   else
  //   this.newAttribute.businessRule=this.editField;
  // }
  changeValue1(id: number, property: string, event: any) {

    this.editField = event.target.textContent;

  }
  changeValuePopulation(id: number, property: string, event: any) {

    this.editField = event.target.textContent;

  }
  updateList(controlId: any, id: number, property: string, event: any) {
    if (confirm("Are you sure to edit the record?")) {

      const editField = event.target.textContent;
      var selectField = event.target.value;
      const checkField = event.target.checked;
      this.personList[id][property] = editField;
      this.updateBody = this.ControlTaskList.filter((items) => items.id === controlId)[0];
      console.log(this.updateBody);
      //this.updateBody.id=controlId;
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

  addFieldValue() {
    if (!this.isEmpty(this.newAttribute.fieldName) && !this.isEmpty(this.newAttribute.fieldType) &&
      !this.isEmpty(this.newAttribute.selectedTemplate) && !this.isEmpty(this.newAttribute.templateField)) {
      this.cDetailBody.fieldName = this.newAttribute.fieldName;
      this.cDetailBody.fieldType = this.newAttribute.fieldType;
      console.log(this.newAttribute);
      this.fieldArray.push(this.newAttribute);
      this.cDetailArray.push(this.cDetailBody);
      console.log(this.fieldArray);
      this.newAttribute = {
        "fieldName": "",
        "fieldType": "",
        "selectedTemplate": "",
        "templateField": ""

      };
      this.cDetailBody = {

        "controlIdTransient": "",
        "fieldName": "",
        "fieldType": "",
        "templateDetailEntityIdTransient": ""
        // ,
        // "template_field_name": ""
      };

      console.log(this.newAttribute);
      console.log(this.cDetailArray);
      // document.getElementById("template").innerHTML="";
      // document.getElementById("templateField").innerHTML="";

    }
    else {
      this.toastr.error('', "Enter All Required Fields!");
    }
  }
  deleteControl(i, rowId) {
    if (confirm("Are you sure to delete the record?")) {
      this.toastr.success('', 'Record deleted!');
      this.fieldArray.splice(rowId, 1);
      this.cDetailArray.splice(rowId, 1);
    }




  }
  remove(id: any, rowId) {
    //this.confirmed=this.openConfirmationDialog1();
    //this.openConfirmationDialog1();
    this.deleteControl(id, rowId);
    //this.personList.splice(rowId, 1);
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  saveControl() {
    if (!this.isEmpty(this.name) && !this.isEmpty(this.frequency) &&
      !this.isEmpty(this.description) && this.cDetailArray.length > 0) {
      this.controlBody.name = this.name;
      this.controlBody.frequency = this.frequency;
      this.controlBody.description = this.description;
      this.controlBody.subProcessId = "2";
      console.log(this.controlBody);
      this.rest.saveControl(this.controlBody).subscribe((data: any) => {
        console.log(data);
        console.log(data.data[0].id);
        if (data.responseCode === "00") {
          for (var i = 0; i < this.cDetailArray.length; i++) {
            this.cDetailArray[i].controlIdTransient = data.data[0].id;
          }
          console.log(this.cDetailArray);
          this.rest.saveControlDetail(this.cDetailArray).subscribe((data: any) => {
            console.log(data);
            if (data.responseCode === "00") {

              this.toastr.success('', 'Control Saved!');
              this.router.navigate(['dashboard/control']);
            }
            else {
              this.toastr.error('', "Some Error Occurred");
            }
          });
        }
      });
    }
    else {
      this.toastr.error('', "Enter Complete Detail!");
    }
  }
  addSessionAudit() {
    //   if(!this.isEmpty(this.company) && !this.isEmpty(this.name) && !this.isEmpty(this.address) && !this.isEmpty(this.startDate)
    //     && !this.isEmpty(this.endDate) && this.fieldArray.length>0 )
    //   {
    //     if(this.startDate<this.endDate){
    //  console.log(this.RequestedData);
    //  console.log(this.RequestedDate);
    //  console.log(this.FulFillDate);
    //  console.log(this.fieldArray);
    //  console.log(this.company);
    //  console.log(this.address);
    //  console.log(this.name);
    //  console.log(this.startDate);
    //  console.log(this.endDate);
    //  this.sessionObject={
    //   "clientIdTransient":this.company.id,
    //   "auditName": this.name,
    //   "fiscalStartDate": this.startDate,
    //   "fiscalEndDate":this.endDate,
    //   "address": this.address,
    //   "city": this.company.city,
    //   "state": this.company.state,
    //   "zip": this.company.zip,
    //   "auditFileList":[]
    // }
    // this.populationObject={
    //   "requestedData": this.RequestedData,
    //   "requestedDate": this.RequestedDate,
    //   "fulfillDate": this.FulFillDate,
    //   "auditSessionId": ""
    // }
    // this.rest.addSessionAudit(this.sessionObject).subscribe((data : any)=>{
    //   //console.log(data);
    //   if(data){
    //     //alert("done");
    //     const sessionid=data.id;
    //     this.populationObject.auditSessionId=data.id;
    //     console.log(data);
    //     this.rest.addControlTaskFromSessionAudit(sessionid,this.fieldArray).subscribe((data : any)=>{
    //   console.log(data);
    //   if(data){
    //    // alert("Data Saved");
    //     this.rest.addPopulation(this.populationObject).subscribe((data : any)=>{
    //       console.log(data);
    //       if(data){
    //         //alert("Data Saved");
    //         this.toastr.success('', 'Record Saved!');
    //         //console.log(data);
    //         this.router.navigate(['dashboard']);

    //       }

    //       });
    //     //console.log(data);


    //   }

    //   });


    //   }
    //   if(data.error){

    //     //console.log(data);
    //     this.toastr.error('', data.error);

    //   }
    // });
    //   }
    //   else{
    //     this.toastr.error('', 'Start Date should be less than End Date!');
    //   }
    // }
    // else{
    //   this.toastr.error('', 'Enter all required fields!');

    // }
  }



}
