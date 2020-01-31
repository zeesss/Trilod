import { Router } from '@angular/router';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Inject, Input } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-evidences',
  templateUrl: './add-evidences.component.html',
  styleUrls: ['./add-evidences.component.scss']
})
export class AddEvidencesComponent implements OnInit {
  uploadForm: FormGroup;

  templateList: any;
  selectedTemplate: any;
  uploadedFile: any;
   formData = new FormData();
  auditList: any;
  controlList: any;
  selectedAudit: any;
  selectedAuditId: any;
  selectedControl: any;
  selectedControlId: any;
   constructor(public dialog: MatDialog, public toastr: ToastrService, public router: Router, public rest: RestService, public formBuilder: FormBuilder, public formsModule: FormsModule, public reactiveFormsModule: ReactiveFormsModule) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
    this.rest.auditSessionFindByClient(localStorage.getItem("clientId")).subscribe((data: any) => {

      this.auditList = data;
      console.log(this.auditList);
    });
    this.rest.getControlList(localStorage.getItem("clientId")).subscribe((data: any) => {

      this.controlList = data.data;
      console.log(this.controlList);
    });

    this.rest.getTemplateList(localStorage.getItem("clientId")).subscribe((data: {}) => {
      if (data['responseCode'] === '00') {
        this.templateList = data['data'];
        console.log(this.templateList);
      }
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
    this.selectedControl = this.controlList.filter((items) => items.name === value)[0];
    this.selectedControlId = this.controlList.filter((items) => items.name === value)[0].id;
    console.log(this.selectedControlId);

  }
  onChangeTemplate(value) {
    this.selectedTemplate = this.templateList.filter((items) => items.name === value)[0];
    //alert(this.selectedTemplate.id);
    console.log(this.selectedTemplate.id);
    this.formData.append('template_id', this.selectedTemplate.id);
  }
  onFileSelect(event) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.uploadedFile = file;
    //   this.uploadForm.get('file').setValue(file);
    // }
    // alert(event.target.files.length);
    for (let j = 0; j < event.target.files.length; j++) {

      let fileItem = event.target.files[j];
      console.log(fileItem.name);
      //this.uploadForm.get('evFile').setValue(fileItem);
      this.formData.append('file', fileItem);
      // alert(fileItem.name);
     // data.append('fileSeq', 'seq'+j);
      //data.append( 'dataType', this.uploadForm.controls.type.value);
      //this.uploadFile(data).subscribe(data => alert(data.message));
    }
  }
  onSubmitEvidences(){
    // alert("hello");
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
    this.formData=new FormData();
  }

}
