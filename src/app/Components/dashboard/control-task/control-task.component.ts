import { Observable } from 'rxjs';
import { ConfirmationService } from './../confirmation/confirmation.service';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { AuthService } from 'src/app/Components/services/auth/auth.service';

import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NgbModal, ModalDismissReasons,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { resolve } from 'url';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { PaginatePipe, PaginationControlsComponent} from 'ngx-pagination';
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-control-task',
  templateUrl: './control-task.component.html',
  styleUrls: ['./control-task.component.scss']

})
export class ControlTaskComponent implements OnInit {

  p: number = 1;
  collection: any[] ;
  editField: string;
  person:any;
  personList: Array<any> ;
  // = [
  //   { id: 1, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
  //   { id: 2, name: 'Guerra Cortez', age: 45, companyName: 'Insectus', country: 'USA', city: 'San Francisco' },
  //   { id: 3, name: 'Guadalupe House', age: 26, companyName: 'Isotronic', country: 'Germany', city: 'Frankfurt am Main' },
  //   { id: 4, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
  //   { id: 5, name: 'Elisa Gallagher', age: 31, companyName: 'Portica', country: 'United Kingdom', city: 'London' },
  // ];
  awaitingPersonList: Array<any> ;
  findBusinessRuleList;
  checkObject: any;
  // = [
  //   { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
  //   { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
  //   { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
  //   { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
  //   { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
  // ];
  updateList(controlId:any,id: number, property: string, event: any) {
    if(confirm("Are you sure to edit the record?")){
    debugger;
    const editField = event.target.textContent;
    var selectField = event.target.value;
    const checkField = event.target.checked;
    this.personList[id][property] = editField;
    this.updateBody=this.ControlTaskList.filter((items) => items.id === controlId)[0];
console.log(this.updateBody);
   //this.updateBody.id=controlId;
   if(property==="code")
   {
     this.updateBody.code=editField;
   }
  //  if(property==="condition1")
  //  {
  //   selectField = selectField.split(": ").pop();
  //    this.updateBody.condition1=selectField;
  //  }
  //  if(property==="condition2")
  //  {
  //    this.updateBody.condition2=selectField;
  //  }
  //  if(property==="condition3")
  //  {
  //   selectField = selectField.split(": ").pop();
  //    this.updateBody.condition3=selectField;
  //  }
  if(property==="businessRule")
   {
     this.updateBody.businessRule=editField;
   }
   if(property==="description")
   {
     this.updateBody.description=editField;
   }
   if(property==="ruleType")
   {
    selectField = selectField.split(": ").pop();
     this.updateBody.ruleType=selectField;
   }
   if(property==="fileType")
   {
    selectField = selectField.split(": ").pop();
    this.file=this.FileTypeList.filter((items) => items.name === selectField)[0];
     this.updateBody.fileTypeId.id=this.file.id;
     this.updateBody.fileTypeId.name=this.file.name;
   }
   if(property==="isActive")
   {
     this.updateBody.isActive=checkField;
   }


    this.rest.updateControlTask(this.updateBody).subscribe((data: {}) => {
      // debugger;
        //      alert(JSON.stringify(data));

       // alert(data);
            console.log(data);
            if(data){
              this.toastr.success('', 'Records updated!');
            }


          },
          (err : HttpErrorResponse)=>{


          this.toastr.error('', 'Failed!');

          }
          );
        }
  }

  remove(id: any, rowId) {
    //this.confirmed=this.openConfirmationDialog1();
    //this.openConfirmationDialog1();
    this.deleteControl(id,rowId);
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
 confirmed;
ControlTaskList;
RuleTypeList;
FileTypeList;
ruleType;
file;
updateBody={
  "id":"",
  "code":"",
  "description":"",
// "condition1":"",
// "condition2":"",
// "condition3":"",
"businessRule":"",
"ruleType":"",

"fileTypeId":{"id":"",
"name":""},
"isActive":true
};
edit={
  "code":"",
  "description":"",
"businessRule":"",
// "condition1":"",
// "condition2":"",
// "condition3":"",
"ruleType":"",

"fileTypeId":{"id":"",
"name":""},
"isActive":true
};
  constructor(public paginate:NgxPaginationModule,public auth:AuthService,public confirmationService:ConfirmationService, public toastr:ToastrService, public dialog:MatDialog,public rest:RestService, public http:HttpClient) { }

  ngOnInit() {
    this.rest.findFormsByUserId(localStorage.getItem("userId")).subscribe((data:any) => {
      debugger;
           this.controlList = data;

         console.log("control===="+this.controlList);
         //console.log(this.controlList.filter((item) => item=== "2"));
         //var task_names = this.controlList.map((task) => task==="1" );

        var myKeys = Object.keys(this.controlList);
        console.log("keys===="+myKeys);
        var matchingKey = myKeys.indexOf("5") !== -1;
        console.log("match===="+matchingKey);


        var matchingKeys:any = myKeys.filter(function(key){ return key.indexOf("5") !== -1 });
        console.log("matchkeys===="+matchingKeys);
        console.log(this.controlList[matchingKeys]);
        this.checkObject=this.controlList[matchingKeys];
      //   var matchingValues = matchingKeys.map(function(key){ return this.controlList[key] });
      //   console.log("matchval===="+matchingValues);
         }
         );
    debugger;
    //this.auth.login("trilod","trilod");
//
    this.rest.getControlTaskList().subscribe((data:any) => {
       debugger;
        //      alert(JSON.stringify(data));
        if(data.pageName==="login"){
          this.auth.logout();

        }
        else{
            this.ControlTaskList = data;
          this.personList=this.ControlTaskList;
          this.collection=this.ControlTaskList;
            console.log(this.ControlTaskList);
        }

          }

          );
    //alert("hi");
    this.rest.getFileTypeList().subscribe((data: {}) => {
      // debugger;
        //      alert(JSON.stringify(data));
            this.FileTypeList = data;

            console.log(this.FileTypeList);

          });
    this.rest.getRuleTypeList().subscribe((data: {}) => {
      // debugger;
        //      alert(JSON.stringify(data));
            this.RuleTypeList = data;

            console.log(this.RuleTypeList);

          });
          this.rest.findBusinessRuleList().subscribe((data: {}) => {
            // debugger;
              //      alert(JSON.stringify(data));
                  this.findBusinessRuleList = data;

                  console.log(this.findBusinessRuleList);

                });

  }
  controlList(controlList: any) {
    throw new Error("Method not implemented.");
  }
  editControl(i){
    alert(i);
    console.log(this.edit);

  }

  deleteControl(i, rowId){
    if(confirm("Are you sure to delete the record?")) {
         this.rest.deleteControlTask(i).subscribe((data: {}) => {
      // debugger;
        //      alert(JSON.stringify(data));


            console.log(data);
            if(data)
            {
              this.toastr.success('', 'Record deleted!');
              this.personList.splice(rowId, 1);
            }

          },
          (err : HttpErrorResponse)=>{


          this.toastr.error('', 'Failed!');

          });
    }




  }
  newControl(){
    this.openDialog();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      data: { name:'hi', animal: "hi" }
    });


  }
  public openConfirmationDialog1():boolean {
    this.confirmationService.confirm('Please confirm..', 'Do you really want to delete the record?')
    .then((confirmed1) => this.confirmed=confirmed1


  )

    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')

    );
    console.log(this.confirmed);
    return this.confirmed;


  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'

})
export class DialogOverviewExampleDialog {
code;
description;
businessRule;
ruleType;
fileType;
FileTypeList;
RuleTypeList;
isActive;
filtered;
saveBody={
  "code":"",
  "description":"",
  // "condition1":"",
  // "condition2":"",
  // "condition3":"",
"businessRule":"",
"ruleType":"",
"createDate": "",
"fileTypeId":{"id":"",
"name":""},
"isActive":true
};
  findBusinessRuleList;
  br1;
  br2;
  br3;
  constructor(
    private router: Router,
    public http:HttpClient, public toastr:ToastrService,

    public rest:RestService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.rest.getFileTypeList().subscribe((data: {}) => {
        // debugger;
          //      alert(JSON.stringify(data));
              this.FileTypeList = data;

              console.log(this.FileTypeList);

            });
      this.rest.getRuleTypeList().subscribe((data: {}) => {
        // debugger;
          //      alert(JSON.stringify(data));
              this.RuleTypeList = data;

              console.log(this.RuleTypeList);

            });
            this.rest.findBusinessRuleList().subscribe((data: {}) => {
              // debugger;
                //      alert(JSON.stringify(data));
                    this.findBusinessRuleList = data;

                    console.log(this.findBusinessRuleList);

                  });
     }

  onNoClick(): void {
    this.dialogRef.close();
    //this.auth.logout();
  }
  isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
  onYesClick(): void {
    if(!this.isEmpty(this.code) && !this.isEmpty(this.description)
    && !this.isEmpty(this.businessRule) && !this.isEmpty(this.ruleType) && !this.isEmpty(this.fileType))
  {
    // if(this.br1===this.br3){
    //   this.toastr.error('', 'Condition 1 & Condition 3 cannot be same!');
    // }

//else{
    this.saveBody.code=this.code;
    this.saveBody.description=this.description;
   // this.saveBody.condition1=this.br1;
    //this.saveBody.condition1=this.findBusinessRuleList.filter((items) => items.textToDisplay === this.br1)[0].id;
    //this.saveBody.condition2=this.br2;
    //this.saveBody.condition3=this.findBusinessRuleList.filter((items) => items.textToDisplay === this.br3)[0].id;
    //this.saveBody.condition3=this.br3;
    this.saveBody.businessRule=this.businessRule;
    this.saveBody.ruleType=this.ruleType;
    if(this.isActive==undefined)
    this.saveBody.isActive=false;
    else
    this.saveBody.isActive=true;
    this.filtered=this.FileTypeList.filter((items) => items.name === this.fileType)[0];
    console.log(this.fileType);
    console.log(this.filtered);
    this.saveBody.createDate= "2019-11-04";
    this.saveBody.fileTypeId=this.filtered;
    // this.saveBody.fileTypeId.id=this.filtered[0].id;
    // this.saveBody.fileTypeId.name=this.filtered[0].name;
   // console.log(this.toObject(this.filtered));

    //console.log(this.filtered);
    console.log(this.saveBody);
    debugger;
    this.rest.addControlTask(this.saveBody).subscribe((data : any)=>{
      console.log(data);
      if(data){
        this.dialogRef.close();
        this.toastr.success('', 'Record Saved!');
        location.reload();

      }
      else{
        this.dialogRef.close();
        this.toastr.error('', 'Sorry! Something went wrong!');
      }


}
,
(err : HttpErrorResponse)=>{


this.toastr.error('', 'Failed!');

});
  //}
  }

  else
  {
    this.toastr.error('', 'Enter all required fields!');
  }
  }

}

