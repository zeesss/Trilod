//import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-control-attribute',
  templateUrl: './control-attribute.component.html',
  styleUrls: ['./control-attribute.component.scss']
})
export class ControlAttributeComponent implements OnInit {
  FileTypeList;
  ControlAttributeList;
  editField: string;
  
  personList: Array<any> ;
  statusList: Array<any> ;
  SearchControlAttribute: any;
  updateBody={
   
    "id": "",
    "attributeName": "",
    "description": "DESC",
    "isActive": true
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
        var matchingKey = myKeys.indexOf("8") !== -1;
        console.log("match===="+matchingKey);
        

        var matchingKeys:any = myKeys.filter(function(key){ return key.indexOf("8") !== -1 });
        console.log("matchkeys===="+matchingKeys);
        console.log(this.controlList[matchingKeys]);
        this.checkObject=this.controlList[matchingKeys];
      //   var matchingValues = matchingKeys.map(function(key){ return this.controlList[key] });
      //   console.log("matchval===="+matchingValues);
         }
         );
    this.rest.getControlAttributeList().subscribe((data: {}) => {
      // debugger;
        //      alert(JSON.stringify(data));
            this.ControlAttributeList = data;
            this.personList=this.ControlAttributeList;
            console.log(this.ControlAttributeList);
            
          });
  }
  updateList(controlId:any,id: number, property: string, event: any) {
    // if(event.target.textContent == null)
    // {
    //   alert("null")
    // }
    // if(event.target.textContent == "")
    // {
    //   alert("empty")
    // }
    if(event.target.textContent == "" && property=="name")
    {
   
      this.toastr.success('Name field cannot be empty', 'Field Empty!');
    }
    else
    { 
      if(confirm("Are you sure to edit the record?")){
        debugger;
        const editField = event.target.textContent;
        const checkField = event.target.checked;
        
        this.personList[id][property] = editField;
        this.updateBody=this.ControlAttributeList.filter((items) => items.id === controlId)[0];
    console.log(this.updateBody);
       //this.updateBody.id=controlId;
       if(property==="name")
       {
         this.updateBody.attributeName=editField;
       }
       if(property==="isActive")
       {
         this.updateBody.isActive=checkField;
       }
      
    
        this.rest.updateControlAttribute(this.updateBody).subscribe((data: {}) => {
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
  search()
  {
    debugger;
   // alert("enter");
  // alert(this.SearchControlAttribute);
   var spaceCheck=this.SearchControlAttribute.replace(/\s/g, '').length;
  //  alert(spaceCheck);
  //  if (!this.SearchCompanyAndAudit.replace(/\s/g, '').length) {
  //   console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
  // }
   if(this.SearchControlAttribute != null && spaceCheck != 0)
   {
    // alert("empty");
     this.rest.searchControlAttribute(this.SearchControlAttribute).subscribe((data : any)=>{
       //alert("enter2");
       this.personList=data;
      // alert(this.personList);
       if(this.personList.length == 0)
       {
         //alert("no data found");
         this.toastr.error('Match Not Found', 'Search!');
       }
      // alert(this.SearchCompanyAndAudit);
      // console.log(data);
 
   }
  ,
   (err : HttpErrorResponse)=>{
     //alert(err.error);
     //alert("error");
    //  alert(err.message);
 
 
       
     this.toastr.error(err.message, 'Failed!');
     // this.auth.logout();
   });
   }
   else if(this.SearchControlAttribute == null|| !spaceCheck)
   {
      
    this.rest.getControlAttributeList().subscribe((data:any) => {
      //debugger; 
       //alert("a");
           //this.sessionsList = data;
         this.personList=data;
         
         });

   }
  //  else if(!spaceCheck)
  //  {
  //    alert("space");
  //  }
  
  }// search end
  
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog4, {
      width: '600px',
      data: { name:'hi', animal: "hi" }
    });
  
   
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'
 
})
export class DialogOverviewExampleDialog4 {
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
  "attributeName":"",
  "description": "DESC",
  "isActive": true
 
};
  constructor(
    private router: Router,
    public http:HttpClient, public toastr:ToastrService,
   
    public rest:RestService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog4>,
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
    if(!this.isEmpty(this.name))
    {
    this.saveBody.attributeName=this.name;
   // alert("enter"+this.saveBody.attributeName);
   // alert(this.saveBody);
    console.log(this.saveBody);
    debugger;
    this.rest.addControlAttribute(this.saveBody).subscribe((data : any)=>{
     // alert("enter2");
      this.dialogRef.close();
      console.log(data);
      //alert(data);
      if(data){
        this.dialogRef.close();
        this.toastr.success('', 'Record Saved!');
        location.reload();
       // alert("enter3");
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


  }// if end
  else
  {
    this.toastr.error('Name field cannot be empty', 'Empty!');
  }
} // function end

} // dialogue class end
