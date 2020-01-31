import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-file-type',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss']
})
export class FileTypeComponent implements OnInit {
  FileTypeList;
  editField: string;
  
  personList: Array<any> ;
  updateBody={
    "id":"",
    "name":""
  };
  controlList: any;
  checkObject: any;
  constructor(public toastr:ToastrService, public dialog:MatDialog,public rest:RestService, public http:HttpClient) { }

  ngOnInit() {
    this.rest.findFormsByUserId(localStorage.getItem("userId")).subscribe((data:any) => {
      debugger;
           this.controlList = data;
       
         console.log("control===="+this.controlList);
         //console.log(this.controlList.filter((item) => item=== "2"));   
         //var task_names = this.controlList.map((task) => task==="1" );       
       
        var myKeys = Object.keys(this.controlList);
        console.log("keys===="+myKeys);
        var matchingKey = myKeys.indexOf("4") !== -1;
        console.log("match===="+matchingKey);
        

        var matchingKeys:any = myKeys.filter(function(key){ return key.indexOf("4") !== -1 });
        console.log("matchkeys===="+matchingKeys);
        console.log(this.controlList[matchingKeys]);
        this.checkObject=this.controlList[matchingKeys];
      //   var matchingValues = matchingKeys.map(function(key){ return this.controlList[key] });
      //   console.log("matchval===="+matchingValues);
         }
         );
    this.rest.getFileTypeList().subscribe((data: {}) => {
      // debugger;
        //      alert(JSON.stringify(data));
            this.FileTypeList = data;
            this.personList=this.FileTypeList;
            console.log(this.FileTypeList);
            
          });
  }
  updateList(controlId:any,id: number, property: string, event: any) {
    if(confirm("Are you sure to edit the record?")){
    debugger;
    const editField = event.target.textContent;
    
    this.personList[id][property] = editField;
    this.updateBody=this.FileTypeList.filter((items) => items.id === controlId)[0];
console.log(this.updateBody);
   //this.updateBody.id=controlId;
   if(property==="name")
   {
     this.updateBody.name=editField;
   }
  

    this.rest.updateFileType(this.updateBody).subscribe((data: {}) => {
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
  changeValue(id: number, property: string, event: any) {
    
    this.editField = event.target.textContent;
    
  }
  edit(i){
    alert(i);
  }
  delete(i){
    alert(i);
  }
  newFile(){
    this.openDialog();
  }
  
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
      width: '600px',
      data: { name:'hi', animal: "hi" }
    });
  
   
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'
 
})
export class DialogOverviewExampleDialog2 {
  name;
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
  "name":""
 
};
  constructor(
    private router: Router,
    public http:HttpClient, public toastr:ToastrService,
   
    public rest:RestService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
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
     }

  onNoClick(): void {
    this.dialogRef.close();
    //this.auth.logout();
  }
  isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
  onYesClick(): void {
    if(!this.isEmpty(this.name) )
  {
    this.saveBody.name=this.name;
    
    console.log(this.saveBody);
    debugger;
    this.rest.addFileType(this.saveBody).subscribe((data : any)=>{
      this.dialogRef.close();
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

  }
  else{
    this.toastr.error('', 'Enter Required Fields!');
  }

  }

}
