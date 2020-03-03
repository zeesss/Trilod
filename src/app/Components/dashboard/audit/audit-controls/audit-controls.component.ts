import { Router } from '@angular/router';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Inject, Input } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-audit',
  templateUrl: './audit-controls.component.html',
  styleUrls: ['./audit-controls.component.scss']
})
export class AuditControlsComponent implements OnInit {
  uploadForm: FormGroup;
  option;
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
  fieldArray: Array<any> = [];
  newAttribute = {
    "control": "",
    "description": ""
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
  auditList: any;
  selectedAudit: any;
  selectedAuditId: any;
  controlList: any;
  selectedControlId: any;
  selectedControl: any;
  templateList: any;
  selectedTemplate1: any;
  //templateList2: any;
  selectedTemplate2: any;
  templateFieldList2: any;
  templateFieldList1: any;
  
  selectedTemplateField1: any;
  selectedTemplateField2: any;
  uploadedFile: any;
  evidenceFiles: any;
  templateListEvidence: any;
  constructor(public dialog: MatDialog, public toastr: ToastrService, public router: Router, public rest: RestService, public formBuilder: FormBuilder, public formsModule: FormsModule, public reactiveFormsModule: ReactiveFormsModule) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: [''],
      sheetNo: new FormControl()
    });
    this.rest.auditSessionFindByClient(localStorage.getItem("clientId")).subscribe((data: any) => {

      this.auditList = data;
      console.log(this.auditList);
    });
    this.rest.getControlList(localStorage.getItem("clientId")).subscribe((data: any) => {

      this.controlList = data.data;
      console.log(this.controlList);
    });
    
    //this.rest.getTemplateList(localStorage.getItem("clientId")).subscribe((data: any) => {
      this.rest.getTemplateListDropDown().subscribe((data: any) => {

      this.templateList = data.data;
      console.log(this.templateList);
    });
    this.rest.getEvidenceFileNames().subscribe((data: any) => {
      alert(data.responseCode);
    //console.log(data);
      this.evidenceFiles = data.data;
      console.log(this.evidenceFiles);
    });



  }
  onChangeEvidenceFile(value){
//alert(value);
this.rest.getTemplateByFileName(value).subscribe((data: any) => {
  this.templateListEvidence = data.data;
  console.log(this.templateListEvidence);
});
  }
  onChange(value) {
    debugger;
    this.selectedAudit = this.auditList.filter((items) => items.auditName === value)[0];
    this.selectedAuditId = this.auditList.filter((items) => items.auditName === value)[0].id;
    console.log(this.selectedAuditId);
  }
  onChangeControl(value) {
    debugger;
    this.selectedControl = this.controlList.filter((items) => items.id === +value)[0];
    this.selectedControlId = this.controlList.filter((items) => items.id === +value)[0].id;
    console.log(this.selectedControlId);
  }
  onChangeTemplate1(value) {
    //alert(value);
   this.selectedTemplate1 = this.templateList.filter((items) => items.id === +value)[0];
   //this.selectedTemplate1=value;
    //console.log(this.selectedTemplate1);
    //this.rest.getTemplateDetails(this.selectedTemplate1.id).subscribe((data: any) => {
      this.rest.getTemplateDetails(+value).subscribe((data: any) => {
      this.templateFieldList1 = data.data;
      console.log(this.templateFieldList1);
    });

  }
  onChangeTemplate2(value) {
   // this.selectedTemplate2 = this.templateList.filter((items) => items.id === value);
   this.selectedTemplate2=+value;
    //console.log(this.selectedTemplate2);
    //this.rest.getTemplateDetails(this.selectedTemplate2.id).subscribe((data: any) => {
    this.rest.getTemplateDetails(value).subscribe((data: any) => {
      this.templateFieldList2 = data.data;
      console.log(this.templateFieldList2);
    });

  }
  onChangeTemplateField1(value) {
    this.selectedTemplateField1 = this.templateFieldList1.filter((items) => items.columnName === value)[0];

    console.log(this.selectedTemplateField1.id);
    //this.newAttribute.templateField = this.selectedTemplateField.columnName;
    //this.cDetailBody.templateDetailEntityIdTransient = this.selectedTemplateField.id;

    //  this.cDetailBody.template_field_name=this.selectedTemplateField.id;

  }
  onChangeTemplateField2(value) {
    this.selectedTemplateField2 = this.templateFieldList2.filter((items) => items.columnName === value)[0];

    console.log(this.selectedTemplateField2.id);
    //this.newAttribute.templateField2 = this.selectedTemplateField.columnName;
    //this.cDetailBody.templateDetailEntityIdTransient = this.selectedTemplateField.id;

    //  this.cDetailBody.template_field_name=this.selectedTemplateField.id;

  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //console.log(file);
      this.uploadedFile = file;

      this.uploadForm.get('file').setValue(file);
    }
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(AddFileAuditDialog, {
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
  onSubmit() {
   // this.openDialog();
    //alert();
    debugger;
    // if (!this.isEmpty(this.selectedControlId)
    //   && !this.isEmpty(this.selectedAuditId)
    //   && !this.isEmpty(this.selectedTemplate1)
    //   && !this.isEmpty(this.selectedTemplateField1)
    //   && !this.isEmpty(this.selectedTemplate2)
    //   && !this.isEmpty(this.selectedTemplateField2)) {
      // alert(this.selectedControlId);
      // alert(this.selectedAuditId);
      // alert(this.selectedTemplate1.id);
      // alert(this.selectedTemplateField1.id);
      // alert(this.selectedTemplate2);
      // alert(this.selectedTemplateField2.id);




      const formData = new FormData();
      if(this.uploadForm.get('sheetNo').value===null){
        formData.append('sheetNo', '1');
       
      }
      //formData.append('source_file', this.uploadForm.get('file').value);
      formData.append('file', this.uploadForm.get('file').value);
      formData.append('controlId', this.selectedControlId);
      //formData.append('audit_session_id', this.selectedAuditId);
      formData.append('auditId', this.selectedAuditId);
      formData.append('templateId1', this.selectedTemplate1.id);
      formData.append('templateField1', this.selectedTemplateField1.id);
      formData.append('templateId2', this.selectedTemplate2);
      formData.append('templateField2', this.selectedTemplateField2.id);
      formData.append('sheetNo', this.uploadForm.get('sheetNo').value);

      $('#loader').addClass('loader');
      setTimeout(()=>{  
      console.log(formData);
      this.rest.auditControlSource(formData).subscribe((data: any) => {

        console.log(data);
        if (data.responseCode === '00') {
          this.toastr.success('', 'Add Evidences!');
          this.router.navigate(['dashboard/addEvidences']);
          //this.openDialog();
        }
        else {
          this.toastr.error('', "Some Error Occurred");

        }



      }
        
      );
      $('#loader').removeClass('loader');
    }, 3000);



    //}
    // else {
    //   this.toastr.error('', 'Enter all required fields!');
    // }
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'
})
export class AddFileAuditDialog {
  uploadForm: FormGroup;
  tfn1;
  tfn2;
  templateList: any;
  selectedTemplate: any;
  uploadedFile: any;
   formData = new FormData();
  constructor(
    private router: Router,
    public http: HttpClient, public toastr: ToastrService,

    public rest: RestService,
    public dialogRef: MatDialogRef<AddFileAuditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.rest.getTemplateList(localStorage.getItem("clientId")).subscribe((data: {}) => {
        if (data['responseCode'] === '00') {
          this.templateList = data['data'];
          console.log(this.templateList);
        }
      });
  }
  onChangeTemplate(value) {
    this.selectedTemplate = this.templateList.filter((items) => items.name === value)[0];
    console.log(this.selectedTemplate.id);
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
  onFileSelect(event) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.uploadedFile = file;
    //   this.uploadForm.get('file').setValue(file);
    // }
    alert(event.target.files.length);
    for (let j = 0; j < event.target.files.length; j++) {
      
      let fileItem = event.target.files[j];
      console.log(fileItem.name);
      //this.uploadForm.get('evFile').setValue(fileItem);
      this.formData.append('file', fileItem);
      alert(fileItem.name);
     // data.append('fileSeq', 'seq'+j);
      //data.append( 'dataType', this.uploadForm.controls.type.value);
      //this.uploadFile(data).subscribe(data => alert(data.message));
    }
  }
  onSubmitEvidences(){
    alert("hello");
    this.formData.append('template_id', this.selectedTemplate.id);
    alert(this.formData.get('template_id'));
    this.rest.addEvidencesAgainstTemplateId(this.formData).subscribe((data: any) => {

      console.log(data);
      if (data.responseCode === '00') {
        this.toastr.success('', 'Evidences Added!');
        
      }
      else {
        this.toastr.error('', "Some Error Occurred");

      }



    }
      
    );
  }
}

