import { Router } from '@angular/router';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit,Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-control',
  templateUrl: './add-control.component.html',
  styleUrls: ['./add-control.component.scss']
})
export class AddControlComponent implements OnInit {
  templateListToSendToDialog=[];
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
    //"controlIdTransient": "",
    "fieldName": "",
    "fieldType": "",
    "templateDetailId": ""
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
    "subprocessId": "",
    "controlDetail":[]
  };
  selectedTemplate: any;
  templateFieldList: any;
  selectedTemplateField: any;
  cDetailArray: Array<any> = [];
  subProcessList: any;
  selectedSubProcess: any;
  showPopup=false;
  templateListForMappingString;


  //dialog variables
  template_name1="";
  template_name2="";
  template_field_name1="";
  template_field_name2="";
  newAttribute1={
    "template_name":"",
    "template_name2":"",
    "template_field_name1":"",
    "template_field_name2":""
  };
  // newAttributeWithIds={
  //   "template_name":"",
  //   "template_name2":"",
  //   "template_field_name1":"",
  //   "template_field_name2":""
  // };
  newAttributeWithIds={
    "templateId1":"",
    "templateId2":"",
    "templateField1":"",
    "templateField2":""
  };
  tableArray=Array<any>();
  mappingList=Array<any>();




  tfn1="";
  tfn2="";
  controlFN;
  controlFieldName: Array<any> = [];
  templateList_dialog: Array<any> = [];
  templateList1: Array<any> = [];
  templateL1;
  templateList2: Array<any> = [];
  templateL2;
  templateid1;
  templateid2;
  controlId;

  selectedTemplateField1: any;
  selectedTemplateField2: any;

  mappingEvidence =
    {
      "controlId": "",
      "evidenceMapping":[]
        // {
        //   "templateId1": "",
        //   "templateField1": "",
        //   "templateId2": "",
        //   "templateField2": "",
        // }
    };
  selectedTemplate1: any;
  selectedTemplate2: any;
  templateFieldList1: any;
  templateFieldList2: any;

  display='none'; //default Variable

  constructor(public dialog: MatDialog,public toastr: ToastrService, public router: Router, public rest: RestService) { }

  ngOnInit() {
    //Has to changed with Session Value of Logged in Client Id
    //var clientId = '14';
    this.rest.getTemplateListDropDown().subscribe((data: any) => {
      this.templateList = data.data;
      console.log(this.templateList);
    //  alert(JSON.stringify(this.templateList));
    });
    this.rest.subProcess_getAll().subscribe((data: any) => {
      this.subProcessList = data.data;
      console.log(this.subProcessList);
    });
  }
  onChangeSubProcess(value){
    this.selectedSubProcess = this.subProcessList.filter((items) => items.name === value)[0];
    this.controlBody.subprocessId=this.selectedSubProcess.id;
    //alert(this.controlBody.subProcessId);
  }
  onChange(value) {
   debugger;
   var y = +value;
    this.selectedTemplate = this.templateList.filter((items) => items.id === y)[0];
    console.log(value);
    console.log("selectedTemplate=====");
    console.log(this.selectedTemplate);
   this.newAttribute.selectedTemplate = this.selectedTemplate.name;
    
    this.rest.getTemplateDetails(y).subscribe((data: any) => {
      this.templateFieldList = data.data;
      console.log(this.templateFieldList);
    });

  }
  onChangeTemplateField(value) {
    this.selectedTemplateField = this.templateFieldList.filter((items) => items.columnName === value)[0];

    console.log(this.selectedTemplateField.id);
    this.newAttribute.templateField = this.selectedTemplateField.columnName;
    this.cDetailBody.templateDetailId = this.selectedTemplateField.id;

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
        this.templateListToSendToDialog.push(this.selectedTemplate);
    console.log(this.templateListToSendToDialog);
      this.cDetailBody.fieldName = this.newAttribute.fieldName;
      this.cDetailBody.fieldType = this.newAttribute.fieldType;
      //console.log(this.newAttribute);
      this.fieldArray.push(this.newAttribute);
      this.cDetailArray.push(this.cDetailBody);
      //console.log(this.fieldArray);
      this.newAttribute = {
        "fieldName": "",
        "fieldType": "",
        "selectedTemplate": "",
        "templateField": ""

      };
      this.cDetailBody = {

       // "controlIdTransient": "",
        "fieldName": "",
        "fieldType": "",
        "templateDetailId": ""
        // ,
        // "template_field_name": ""
      };

      //console.log(this.newAttribute);
      //console.log(this.cDetailArray);
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
    //alert();
    if (!this.isEmpty(this.name) && !this.isEmpty(this.frequency) &&
      !this.isEmpty(this.description) && this.cDetailArray.length > 0) {
        $('#loader').addClass('loader');
      this.controlBody.name = this.name;
      this.controlBody.frequency = this.frequency;
      this.controlBody.description = this.description;
      //this.controlBody.subProcessId = "2";
      this.controlBody.controlDetail=this.cDetailArray;
      console.log(this.controlBody);
      //this.openDialog();
      this.rest.saveControl(this.controlBody).subscribe((data: any) => {
        console.log(data);
        //alert(data.data[0].controlId);
       
        if (data.responseCode === "00") {
          $('#loader').removeClass('loader');
          this.showPopup=true;
          
          //alert(data.responseCode);
          this.toastr.success('', 'Map Controls!');
          // this.templateList=data.list;
          // this.controlId=data.id;
         // alert(JSON.stringify(this.templateListToSendToDialog));
         //If template is same then pop uo wouldn't open
          this.templateListForMappingString=this.templateListToSendToDialog[0].name;
        
          var dialogOpen=true;
          this.templateListToSendToDialog.forEach(element => {
            if(element.name==this.templateListForMappingString)
            dialogOpen=false;
            else 
            dialogOpen=true;
          });
          if(dialogOpen)
          {
            //alert();
            this.display='block'; //Set block css
            var element = document.getElementById("popupbutton");
            element.click();
          }
          else
          {
            // var element = document.getElementById("myModal");
            // element.click();
           // alert();
            
          }


          //dialog related
         
          this.templateList_dialog=this.templateListToSendToDialog;
          this.controlId=data.data[0].controlId;
         // this.openDialog(data.data[0].controlId);
          // for (var i = 0; i < this.cDetailArray.length; i++) {
          //   this.cDetailArray[i].controlIdTransient = data.data[0].id;
          // }
          // console.log(this.cDetailArray);
          // this.rest.saveControlDetail(this.cDetailArray).subscribe((data: any) => {
          //   console.log(data);
          //   if (data.responseCode === "00") {

          //     this.toastr.success('', 'Control Saved!');
          //     this.router.navigate(['dashboard/control']);
          //   }
          //   else {
          //     this.toastr.error('', "Some Error Occurred");
          //   }
          // });
        }
      });
    }
    else {
      this.toastr.error('', "Enter Complete Detail!");
      this.showPopup=false;
      var element = document.getElementById("myModal");
      element.click();
    }
  }
  // openDialog(controlId): void {
  //   let dialogRef = this.dialog.open(control_template_mapping_MapTemplate, {
  //     width: '800px',
  //     data: {list:this.templateListToSendToDialog,id:controlId}
      
  //   });
  // }
 
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
  //dialog functions

  onChangeTemplate1(value) {

   //alert(value);
    this.selectedTemplate1 = this.templateList_dialog.filter((items) => items.name === value)[0];
var y = +value;
   //alert(y);
   debugger;
    this.selectedTemplate1 = this.templateList_dialog.filter((items) => items.id === y)[0];
   //alert(JSON.stringify(this.templateList_dialog.filter((items) => items.name === value)[0]));
   // alert("enter");
    //alert(this.selectedTemplate1);
    this.newAttribute1.template_name = this.selectedTemplate1.name;
    this.newAttributeWithIds.templateId1=this.selectedTemplate1.id;
    //this.cDetailBody.templateDetailEntityIdTransient=this.selectedTemplate.id;
    console.log("selectedTemplate=====");
    console.log(this.selectedTemplate1);
    //alert(this.selectedTemplate1.id);
    //alert();
    //alert(this.selectedTemplate1.id);
  
    this.rest.getTemplateDetails(y).subscribe((data: any) => {

      this.templateFieldList1 = data.data;

      debugger;
      //alert(JSON.stringify(this.templateFieldList1));
      console.log("Template field 1");
      console.log(this.templateFieldList1);
    });

  }
  onChangeTemplate2(value) {
  
    this.selectedTemplate2 = this.templateList_dialog.filter((items) => items.id === +value)[0];
    
    this.newAttribute1.template_name2 = this.selectedTemplate2.name;
    this.newAttributeWithIds.templateId2=this.selectedTemplate2.id;
    //this.cDetailBody.templateDetailEntityIdTransient=this.selectedTemplate.id;
    console.log("selectedTemplate=====");
    console.log(this.selectedTemplate2);
    this.rest.getTemplateDetails(this.selectedTemplate2.id).subscribe((data: any) => {
      this.templateFieldList2 = data.data;
      console.log(this.templateFieldList2);
    });

  }
  onChangeTemplateField1(value) {
  
    this.selectedTemplateField1 = this.templateFieldList1.filter((items) => items.columnName === value)[0];

    console.log(this.selectedTemplateField1.id);
    this.newAttribute1.template_field_name1 = this.selectedTemplateField1.columnName;
    this.newAttributeWithIds.templateField1 = this.selectedTemplateField1.id;
    //this.cDetailBody.templateDetailEntityIdTransient = this.selectedTemplateField1.id;

    //  this.cDetailBody.template_field_name=this.selectedTemplateField.id;

  }
  onChangeTemplateField2(value) {
  
    this.selectedTemplateField2 = this.templateFieldList2.filter((items) => items.columnName === value)[0];

    console.log(this.selectedTemplateField2.id);
    this.newAttribute1.template_field_name2 = this.selectedTemplateField2.columnName;
    this.newAttributeWithIds.templateField2 = this.selectedTemplateField2.id;
    //this.cDetailBody.templateDetailEntityIdTransient = this.selectedTemplateField2.id;

    //  this.cDetailBody.template_field_name=this.selectedTemplateField.id;

  }
  onClickAdd()
  {
    
    
    // this.newAttribute.template_name=this.template_name1;
    // this.newAttribute.template_name2=this.template_name2;
    // this.newAttribute.template_field_name1=this.template_field_name1;
    // this.newAttribute.template_field_name2=this.template_field_name2;
    this.tableArray.push(this.newAttribute1);
    this.mappingList.push(this.newAttributeWithIds);
    this.newAttribute1={
      "template_name":"",
      "template_name2":"",
      "template_field_name1":"",
      "template_field_name2":""
    };
    // this.newAttributeWithIds={
    //   "template_name":"",
    //   "template_name2":"",
    //   "template_field_name1":"",
    //   "template_field_name2":""
    // };
    this.newAttributeWithIds={
      "templateId1":"",
      "templateId2":"",
      "templateField1":"",
      "templateField2":""
    };
   console.log(this.mappingList);
  }
  onNoClick(): void {
  //  this.dialogRef.close();
  location.reload();
  }
  saveMapping(){
    $('#loader').addClass('loader');
    debugger;
this.mappingEvidence.controlId=this.controlId;
this.mappingEvidence.evidenceMapping=this.mappingList;
debugger;
console.log("mapping evidence");
console.log(this.mappingEvidence);
this.rest.saveTemplateMapping(this.mappingEvidence).subscribe((data: any) => {
  console.log(data);
 
  if (data.responseCode === "00") {
    $('#loader').removeClass('loader');
    this.toastr.success('', 'Mapping Done Successfully!');
    var element = document.getElementById("close");
    element.click();
    location.reload();
   
  }
});
  }



}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'

})
export class control_template_mapping_MapTemplate {
  template_name1="";
  template_name2="";
  template_field_name1="";
  template_field_name2="";
  newAttribute={
    "template_name":"",
    "template_name2":"",
    "template_field_name1":"",
    "template_field_name2":""
  };
  newAttributeWithIds={
    "template_name":"",
    "template_name2":"",
    "template_field_name1":"",
    "template_field_name2":""
  };
  tableArray=Array<any>();
  mappingList=Array<any>();




  tfn1="";
  tfn2="";
  controlFN;
  controlFieldName: Array<any> = [];
  templateList: Array<any> = [];
  templateList1: Array<any> = [];
  templateL1;
  templateList2: Array<any> = [];
  templateL2;
  templateid1;
  templateid2;
  controlId;

  selectedTemplateField1: any;
  selectedTemplateField2: any;

  mappingEvidence =
    {
      "controlId": "",
      "evidenceMapping":[]
        // {
        //   "templateId1": "",
        //   "templateField1": "",
        //   "templateId2": "",
        //   "templateField2": "",
        // }
    };
  selectedTemplate1: any;
  selectedTemplate2: any;
  templateFieldList1: any;
  templateFieldList2: any;

  constructor(
    private router: Router,
    public http: HttpClient, public toastr: ToastrService,

    public rest: RestService,
    public dialogRef: MatDialogRef<control_template_mapping_MapTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.templateList=data.list;
      this.controlId=data.id;
      console.log(this.templateList.length);
      console.log(this.controlId);
    // this.controlId = this.data.controlId;
    // this.templateid1 = this.data.template_id1;
    // this.templateid2 = this.data.template_id2;


    // this.rest.getTemplateDetails(this.templateid1).subscribe((data1: any) => {
    //   this.templateL1 = data1.data;
    //   this.templateList1 = this.templateL1;
    // });
    // this.rest.getTemplateDetails(this.templateid2).subscribe((data1: any) => {
    //   this.templateL2 = data1.data;
    //   this.templateList2 = this.templateL2;
    // });
  }
  onChangeTemplate1(value) {
    this.selectedTemplate1 = this.templateList.filter((items) => items.name === value)[0];
    
    this.newAttribute.template_name = this.selectedTemplate1.name;
    this.newAttributeWithIds.template_name=this.selectedTemplate1.id;
    //this.cDetailBody.templateDetailEntityIdTransient=this.selectedTemplate.id;
    console.log("selectedTemplate=====");
    console.log(this.selectedTemplate1);
    this.rest.getTemplateDetails(this.selectedTemplate1.id).subscribe((data: any) => {
      this.templateFieldList1 = data.data;
      console.log(this.templateFieldList1);
    });

  }
  onChangeTemplate2(value) {
    this.selectedTemplate2 = this.templateList.filter((items) => items.name === value)[0];
    
    this.newAttribute.template_name2 = this.selectedTemplate2.name;
    this.newAttributeWithIds.template_name2=this.selectedTemplate2.id;
    //this.cDetailBody.templateDetailEntityIdTransient=this.selectedTemplate.id;
    console.log("selectedTemplate=====");
    console.log(this.selectedTemplate2);
    this.rest.getTemplateDetails(this.selectedTemplate2.id).subscribe((data: any) => {
      this.templateFieldList2 = data.data;
      console.log(this.templateFieldList2);
    });

  }
  onChangeTemplateField1(value) {
    this.selectedTemplateField1 = this.templateFieldList1.filter((items) => items.columnName === value)[0];

    console.log(this.selectedTemplateField1.id);
    this.newAttribute.template_field_name1 = this.selectedTemplateField1.columnName;
    this.newAttributeWithIds.template_field_name1 = this.selectedTemplateField1.id;
    //this.cDetailBody.templateDetailEntityIdTransient = this.selectedTemplateField1.id;

    //  this.cDetailBody.template_field_name=this.selectedTemplateField.id;

  }
  onChangeTemplateField2(value) {
    this.selectedTemplateField2 = this.templateFieldList2.filter((items) => items.columnName === value)[0];

    console.log(this.selectedTemplateField2.id);
    this.newAttribute.template_field_name2 = this.selectedTemplateField2.columnName;
    this.newAttributeWithIds.template_field_name2 = this.selectedTemplateField2.id;
    //this.cDetailBody.templateDetailEntityIdTransient = this.selectedTemplateField2.id;

    //  this.cDetailBody.template_field_name=this.selectedTemplateField.id;

  }
  onClickAdd()
  {
    
    
    // this.newAttribute.template_name=this.template_name1;
    // this.newAttribute.template_name2=this.template_name2;
    // this.newAttribute.template_field_name1=this.template_field_name1;
    // this.newAttribute.template_field_name2=this.template_field_name2;
    this.tableArray.push(this.newAttribute);
    this.mappingList.push(this.newAttributeWithIds);
    this.newAttribute={
      "template_name":"",
      "template_name2":"",
      "template_field_name1":"",
      "template_field_name2":""
    };
    this.newAttributeWithIds={
      "template_name":"",
      "template_name2":"",
      "template_field_name1":"",
      "template_field_name2":""
    };
   console.log(this.mappingList);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  saveMapping(){
this.mappingEvidence.controlId=this.controlId;
this.mappingEvidence.evidenceMapping=this.mappingList;
debugger;
console.log(this.mappingEvidence);
this.rest.saveTemplateMapping(this.mappingEvidence).subscribe((data: any) => {
  console.log(data);
 
  if (data.responseCode === "00") {
    this.toastr.success('', 'Mapping Done Successfully!');
    location.reload();
   
  }
});
  }

  // isEmpty(val) {
  //   return (val === undefined || val == null || val.length <= 0) ? true : false;
  // }

  // onTF1Change(value) {
  //   this.selectedTemplateField1 = this.templateList1.filter((items) => items.columnName === value)[0];
  // }

  // onTF2Change(value) {
  //   this.selectedTemplateField2 = this.templateList2.filter((items) => items.columnName === value)[0];
  // }

  // onYesClick(): void {
  //   this.mappingEvidence = {
  //     "controlId": this.controlId,
  //     "evidenceMapping":
  //       {
  //         "templateId1": this.templateid1,
  //         "templateField1": this.selectedTemplateField1.id,
  //         "templateId2": this.templateid2,
  //         "templateField2": this.selectedTemplateField2.id,
  //       }
  //   };

  //   this.rest.saveTemplateMapping(this.mappingEvidence).subscribe((data: any) => {
  //     if (data.responseCode == "00") {
  //       this.toastr.success('', 'Record Saved!');
  //       this.dialogRef.close();
  //     }
  //   });
  // }
}

