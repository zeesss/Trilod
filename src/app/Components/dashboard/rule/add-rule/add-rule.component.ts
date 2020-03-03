import { Router } from '@angular/router';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Inject, Input } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { json } from 'node_modules/@angular-devkit/core/src';
import { stringify } from 'querystring';
import { any, ifTrue } from 'node_modules/codelyzer/util/function';
import * as $ from 'jquery';

@Component({
  selector: 'app-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.scss']
})
export class AddRuleComponent implements OnInit {
  controlL;
  controlList: Array<any> = [];
  fieldTypeValue;  //0=fixed or 1=control
  fieldType;
  controlFN;
  controlFieldName: Array<any> = [];
  rule_name;
  fieldArray: Array<any> = [];
  controlID;
  template_id1;
  template_id2;


  control;
  condition = "";

  cfn1;
  cfn2;

  value;
  disableAll: boolean = false;
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
  checkMapping =
    {
      "controlId": "",
      "templateId1": "",
      "templateId2": ""
    };
      newAttribute = {
    //   "field_name":"",
    //   "condition":"",
    // "field_name2":"",
    // "name":""
    "field1": "",
    "field1Name": "",
    "field2": "",
    "field2Name": "",
    "type": "",
    "operator": "",
    "name": ""
  };
  ruleSaveBody =
    {
      "controlId": "",
      "rules": [
        {
          "field1": "",
          "field2": "",
          "type": "",
          "operator": "",
          "name": ""
        }
      ]
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
    "isActive": true
  };
  sessionObject: { "clientIdTransient": number; "auditName": string; "fiscalStartDate": string; "fiscalEndDate": string; "address": string; "city": string; "state": string; "zip": string; "auditFileList": any; };
  showcard: boolean = false;

  constructor(public dialog: MatDialog, public toastr: ToastrService, public router: Router, public rest: RestService) { }

  ngOnInit() {
    // alert(localStorage.getItem("clientId"));
    this.rest.getControlList(localStorage.getItem("clientId")).subscribe((data: {}) => {
      this.controlL = data;
      this.controlList = this.controlL.data;
    });

  }
  selectControl() {
    $('#loader').addClass('loader');
    setTimeout(()=>{  
    this.disableAll = true;
    this.showcard = true;
    this.controlList.forEach(element => {
      if (element.name == this.control) {
        this.controlID = element.id;
      }
    });
    this.rest.getControlFieldName(this.controlID).subscribe((data: {}) => {
      this.controlFN = data;
      this.controlFieldName = this.controlFN.data;
    });
    $('#loader').removeClass('loader');
  }, 2000);
  
  }
  deselectControl() {
    this.disableAll = false;
    this.showcard = false;
  }
  onChange_fieldType() {
    //alert(this.fieldType);
    //alert("enter");
    if (this.fieldType == "Value") {
      this.fieldTypeValue = 0;
    }
    else if (this.fieldType == "Control_field") {
      this.fieldTypeValue = 1;
    }
    //alert(this.fieldTypeValue);
  }
  onChange(value) {
    debugger;
    // this.company=this.CompanyList.filter((items) => items.clientName === value)[0];
    // this.address=this.CompanyList.filter((items) => items.clientName === value)[0].address;
    // console.log(this.address);
  }
  // changeValue(id: number, property: string, event: any) {
  //   debugger;
  //   this.editField = event.target.textContent;
  //   if(property==="description")
  //   this.newAttribute.description=this.editField;
  //   else
  //   this.newAttribute.businessRule=this.editField;
  // }
  // changeValue1(id: number, property: string, event: any) {
  //   debugger;
  //   this.editField = event.target.textContent;

  // }

 

  addFieldValue() {
    if (!this.isEmpty(this.rule_name) && !this.isEmpty(this.condition) && !this.isEmpty(this.fieldType)
      && !this.isEmpty(this.cfn1) && (!this.isEmpty(this.cfn2) || !this.isEmpty(this.value))) {
      var cfn1_template_id;
      var cfn2_template_id;
      if (this.rule_name !== "") {
        this.newAttribute.name = this.rule_name;
      }
      if (this.condition !== "") {
        this.newAttribute.field1Name = this.cfn1;
        this.newAttribute.operator = this.condition;
        this.controlFieldName.forEach(element => {
          if (element.fieldName == this.cfn1) {
            this.newAttribute.field1 = element.id;
            cfn1_template_id = element.templateDetailEntity.template.id;
          }
        });
      }
      if (this.fieldType !== 'Value' && this.fieldType !== '') {
        this.newAttribute.field2Name = this.cfn2;
        this.controlFieldName.forEach(element => {
          if (element.fieldName == this.cfn2) {
            this.newAttribute.field2 = element.id;
            cfn2_template_id = element.templateDetailEntity.template.id;
          }
        });

        //if (cfn1_template_id != cfn2_template_id) {
          // this.checkMapping =
          //   {
          //     "controlId": this.controlID,
          //     "templateId1": cfn1_template_id,
          //     "templateId2": cfn2_template_id
          //   };

          // this.rest.check_Template_Mapping(this.checkMapping).subscribe((data: any) => {
          //   if (data.responseCode == "00") {
          //     if (data.isExist == "false") {
          //       this.openDialog(this.controlID, cfn1_template_id, cfn2_template_id);
          //       //Adding to Table after mapping
          //       this.newAttribute.type = this.fieldTypeValue;
          //       this.fieldArray.push(this.newAttribute);
          //       this.newAttribute = {
          //         "field1": "",
          //         "field1Name": "",
          //         "field2": "",
          //         "field2Name": "",
          //         "type": "",
          //         "operator": "",
          //         "name": ""
          //       };
          //     }
          //     else {
          //       this.newAttribute.type = this.fieldTypeValue;
          //       this.fieldArray.push(this.newAttribute);
          //       this.newAttribute = {
          //         "field1": "",
          //         "field1Name": "",
          //         "field2": "",
          //         "field2Name": "",
          //         "type": "",
          //         "operator": "",
          //         "name": ""
          //       };
          //     }
          //   }
          // });
        // } 
        // else {
          this.newAttribute.type = this.fieldTypeValue;
          this.fieldArray.push(this.newAttribute);
          this.newAttribute = {
            "field1": "",
            "field1Name": "",
            "field2": "",
            "field2Name": "",
            "type": "",
            "operator": "",
            "name": ""
          };
        //}
      }
      if (this.fieldType === 'Value') {
        this.newAttribute.field2 = this.value;
        //alert(this.value);
        this.newAttribute.type = this.fieldTypeValue;
        this.fieldArray.push(this.newAttribute);
        this.newAttribute = {
          "field1": "",
          "field1Name": "",
          "field2": "",
          "field2Name": "",
          "type": "",
          "operator": "",
          "name": ""
        };
      }
    } else {
      this.toastr.error('', "Enter All Required Fields!");
    }
  }
  // openDialog(controlId, tempId1, tempId2): void {
  //   let dialogRef = this.dialog.open(MapTemplate, {
  //     width: '600px',
  //     data: {
  //       controlId: controlId,
  //       template_id1: tempId1,
  //       template_id2: tempId2
  //     }
  //   });
  // }
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
  saveRule() {
    if (true) {
      $('#loader').addClass('loader');
      setTimeout(()=>{  
      this.ruleSaveBody.controlId = this.controlID;
      this.ruleSaveBody.rules = this.fieldArray;
      console.log(this.ruleSaveBody);
      //alert(JSON.stringify(this.ruleSaveBody));
      // this.fieldArray.forEach(element => {
      //   this.ruleSaveBody.rules.push(element);
      // });

      console.log(this.ruleSaveBody);
      this.rest.saveRule(this.ruleSaveBody).subscribe((data: any) => {
        debugger;
        console.log("response");
        console.log(data);
        if (data.responseCode === "00") {
          
          this.toastr.success('', 'Rule Saved!');
          this.router.navigate(['dashboard/rule']);
        } else {
          this.toastr.error('', "Some error ocurred!");
        }
      });
      $('#loader').removeClass('loader');
    }, 3000);
    } 
  }

  // addSessionAudit() {
  //   this.fieldArray.forEach(element => {
  //     this.ruleSaveBody.rules.push(element);
  //   });

  //   this.ruleSaveBody.controlId = this.controlID;
  //   this.rest.saveRule(this.ruleSaveBody).subscribe((data: any) => {
  //     var reponse = data;
  //     //  alert(JSON.stringify(data));
  //     if (data.responseCode === "00") {
  //       this.toastr.success('', 'Record Saved!');
  //     }
  //   });
  // }
}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html'

// })
// export class MapTemplate {
//   controlFN;
//   controlFieldName: Array<any> = [];
//   templateList1: Array<any> = [];
//   templateL1;
//   templateList2: Array<any> = [];
//   templateL2;
//   templateid1;
//   templateid2;
//   controlId;

//   selectedTemplateField1: any;
//   selectedTemplateField2: any;

//   mappingEvidence =
//     {
//       "controlId": "",
//       "evidenceMapping":
//         {
//           "templateId1": "",
//           "templateField1": "",
//           "templateId2": "",
//           "templateField2": "",
//         }
//     };

//   constructor(
//     private router: Router,
//     public http: HttpClient, public toastr: ToastrService,

//     public rest: RestService,
//     public dialogRef: MatDialogRef<MapTemplate>,
//     @Inject(MAT_DIALOG_DATA) public data: any) {
//     this.controlId = this.data.controlId;
//     this.templateid1 = this.data.template_id1;
//     this.templateid2 = this.data.template_id2;


//     this.rest.getTemplateDetails(this.templateid1).subscribe((data1: any) => {
//       this.templateL1 = data1.data;
//       this.templateList1 = this.templateL1;
//     });
//     this.rest.getTemplateDetails(this.templateid2).subscribe((data1: any) => {
//       this.templateL2 = data1.data;
//       this.templateList2 = this.templateL2;
//     });
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   isEmpty(val) {
//     return (val === undefined || val == null || val.length <= 0) ? true : false;
//   }

//   onTF1Change(value) {
//     this.selectedTemplateField1 = this.templateList1.filter((items) => items.columnName === value)[0];
//   }

//   onTF2Change(value) {
//     this.selectedTemplateField2 = this.templateList2.filter((items) => items.columnName === value)[0];
//   }

//   onYesClick(): void {
//     this.mappingEvidence = {
//       "controlId": this.controlId,
//       "evidenceMapping":
//         {
//           "templateId1": this.templateid1,
//           "templateField1": this.selectedTemplateField1.id,
//           "templateId2": this.templateid2,
//           "templateField2": this.selectedTemplateField2.id,
//         }
//     };

//     this.rest.saveTemplateMapping(this.mappingEvidence).subscribe((data: any) => {
//       if (data.responseCode == "00") {
//         this.toastr.success('', 'Record Saved!');
//         this.dialogRef.close();
//       }
//     });
//   }
// }
