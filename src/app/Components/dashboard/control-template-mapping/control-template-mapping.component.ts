import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit, Inject } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { MatDialog } from '_node_modules/@angular/material/typings/dialog/public-api';

@Component({
  selector: 'app-control-template-mapping',
  templateUrl: './control-template-mapping.component.html',
  styleUrls: ['./control-template-mapping.component.scss']
})
export class ControlTemplateMappingComponent implements OnInit {
  template1="";
  template2="";
  fieldType1;
  tableArray=Array<any>();
  newAttribute={
    "template_name":"",
    "template_field_name":""
  };
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(control_template_mapping_MapTemplate, {
      width: '800px',
      data: {
        // controlId: controlId,
        // template_id1: tempId1,
        // template_id2: tempId2
      }
    });
  }
  onClickAdd()
  {
    this.newAttribute={
      "template_name":"",
      "template_field_name":""
    };
    this.newAttribute.template_name=this.template1;
    this.newAttribute.template_field_name=this.fieldType1;
    this.tableArray.push(this.newAttribute);
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
  tableArray=Array<any>();




  tfn1="";
  tfn2="";
  controlFN;
  controlFieldName: Array<any> = [];
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
      "evidenceMapping":
        {
          "templateId1": "",
          "templateField1": "",
          "templateId2": "",
          "templateField2": "",
        }
    };

  constructor(
    private router: Router,
    public http: HttpClient, public toastr: ToastrService,

    public rest: RestService,
    public dialogRef: MatDialogRef<control_template_mapping_MapTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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
  onClickAdd()
  {
    this.newAttribute={
      "template_name":"",
      "template_name2":"",
      "template_field_name1":"",
      "template_field_name2":""
    };
    
    this.newAttribute.template_name=this.template_name1;
    this.newAttribute.template_name2=this.template_name2;
    this.newAttribute.template_field_name1=this.template_field_name1;
    this.newAttribute.template_field_name2=this.template_field_name2;
    this.tableArray.push(this.newAttribute);
   // alert(JSON.stringify(this.tableArray));
  }
  onNoClick(): void {
    this.dialogRef.close();
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
