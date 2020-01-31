//import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-risk-control-matrix',
  templateUrl: './risk-control-matrix.component.html',
  styleUrls: ['./risk-control-matrix.component.scss']
})
export class RiskControlMatrixComponent implements OnInit {

  //FileTypeList;
  ControlAttributeList;
  riskControlList;
  temp_riskControlList;
  editField: string;
  attribute;
  personList: Array<any> ;
  statusList: Array<any> ;
  SearchControlAttribute: any;
  store;
  updateBody={
   
    "id": "",
    "name": "",
    "description": "DESC",
    "isActive": true,
        "attributeId": {
           
            "id": 5

        } 
  };
  controlList: any;
  checkObject: any;
  constructor(public auth:AuthService,public toastr:ToastrService, public dialog:MatDialog,public rest:RestService, public http:HttpClient) { }

  ngOnInit() {
    this.rest.findFormsByUserId(localStorage.getItem("userId")).subscribe((data:any) => {
      debugger;
           this.controlList = data;
       
         console.log("control===="+this.controlList);
         //console.log(this.controlList.filter((item) => item=== "2"));   
         //var task_names = this.controlList.map((task) => task==="1" );       
       
        var myKeys = Object.keys(this.controlList);
        console.log("keys===="+myKeys);
        var matchingKey = myKeys.indexOf("9") !== -1;
        console.log("match===="+matchingKey);
        

        var matchingKeys:any = myKeys.filter(function(key){ return key.indexOf("9") !== -1 });
        console.log("matchkeys===="+matchingKeys);
        console.log(this.controlList[matchingKeys]);
        this.checkObject=this.controlList[matchingKeys];
      //   var matchingValues = matchingKeys.map(function(key){ return this.controlList[key] });
      //   console.log("matchval===="+matchingValues);
         }
         );
    this.rest.getRiskControlMatrixList().subscribe((data:any) => {
      debugger;
       //      alert(JSON.stringify(data));
       if(data.pageName==="login"){
         this.auth.logout();

       }
       else{
           this.riskControlList = data;
         this.personList=this.riskControlList;
         this.temp_riskControlList=this.riskControlList;
          // console.log(this.riskControlList);
       }
           
         }
         
         );
   //alert("hi");
   this.rest.getControlAttributeList().subscribe((data: {}) => {
     // debugger;
       //      alert(JSON.stringify(data));
           this.ControlAttributeList = data;
         
          // console.log(this.ControlAttributeList);
           
         });
  } //ngOnInit end
  newRiskControl(){
    this.openDialog();
  }
  
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog5, {
      width: '600px',
      data: { name:'hi', animal: "hi" }
    });
  }

  isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

  updateList(controlId:any,id: number, property: string, event: any) {
    const editField1 = event.target.textContent;
    const checkField1 = event.target.checked;
    if( this.isEmpty(editField1) && property==="name" )
    {
      this.toastr.error('Required fields are empty', 'Empty Field!');
    }
    // else if(this.isEmpty(checkField1) && (property==="controlAttribute"))
    // {
    //   this.toastr.error('Required fields are empty', 'Empty Field!');
    // }
    else if(confirm("Are you sure to edit the record?")){
    debugger;
    const editField = event.target.textContent;
    var selectField = event.target.value;
    const checkField = event.target.checked;
    //this.personList[id][property] = editField;
    console.log(this.riskControlList);
    console.log(controlId);
    console.log(this.riskControlList.filter((items) => items.id === controlId)[0]);
    this.store=this.riskControlList.filter((items) => items.id === controlId)[0];
    this.updateBody.id=this.store.id;
    this.updateBody.name=this.store.name;
    this.updateBody.isActive=this.store.isActive;
    this.updateBody.attributeId.id=this.store.attributeId.id;
    //console.log(this.updateBody);
   //this.updateBody.id=controlId;
   if(property==="name")
   {
     this.updateBody.name=editField;
     this.personList[id][property] = editField;
   }
   
  //  if(property==="ruleType")
  //  {
  //   selectField = selectField.split(": ").pop();
  //    this.updateBody.ruleType=selectField;
  //  }
   if(property==="controlAttribute")
   {
    //this.personList[id][property] = selectField;
    selectField = selectField.split(": ").pop();
   // alert(selectField);
    this.attribute=this.ControlAttributeList.filter((items) => items.attributeName === selectField)[0];
   // alert(this.attribute);
   // console.log(this.attribute);
     this.updateBody.attributeId.id=this.attribute.id;
     //alert(this.attribute.id);
    // alert(this.updateBody.attributeId.id);
    //  this.updateBody.fileTypeId.name=this.file.name;
   }
   if(property==="isActive")
   {
     this.updateBody.isActive=checkField;
     this.personList[id][property] = checkField;
   }
  // console.log(this.updateBody);
 

    this.rest.updateRiskControlMatrix(this.updateBody).subscribe((data: {}) => {
      // debugger;
        //      alert(JSON.stringify(data));
            
       // alert(data);
           // console.log("data recieved"+data);
            if(data){
              this.toastr.success('', 'Records updated!');
            }
            
            
          },
          (err : HttpErrorResponse)=>{
          
          
          this.toastr.error('', 'Failed!');
          
          }
          );
        }
  } //Update list end
  changeValue(id: number, property: string, event: any) {
    
    this.editField = event.target.textContent;
    
  }// change value end

  search()
  {
    var spaceCheck=this.SearchControlAttribute.replace(/\s/g, '').length;
    if(!this.isEmpty(this.SearchControlAttribute) && spaceCheck != 0)
    {
      this.rest.searchRiskControlMatrix(this.SearchControlAttribute).subscribe((data: {}) => {
        // debugger;
          //      alert(JSON.stringify(data));
          this.riskControlList = data;
          this.personList=this.riskControlList;
        }
        ,
        (err : HttpErrorResponse)=>{
          this.toastr.error('', 'Failed!');
        });
    }
    else
    {
      this.personList=this.temp_riskControlList;
    }
  }



} //Risk Control Matrix Component end
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'
 
})
export class DialogOverviewExampleDialog5 {
  ControlAttributeList;
  riskControlList;
  editField: string;
  
  personList: Array<any> ;
  statusList: Array<any> ;
  name;

//description;
//businessRule;
//ruleType;
fileType;
controlAttribute;
//FileTypeList;
//RuleTypeList;
isActive;
filtered;
// saveBody={
//   "code":"",
//   "description":"",
// "businessRule":"",
// "ruleType":"",
// "createDate": "2019-11-04",
// "fileTypeId":{"id":"",
// "name":""},
// "isActive":true
// };
saveBody={
    "name": "Risk1",
    "description": "DESC",
    "attributeId": {
        "id": 5
    }
};
  constructor(
    private router: Router,
    public http:HttpClient, public toastr:ToastrService,
   
    public rest:RestService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog5>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.rest.getControlAttributeList().subscribe((data: {}) => {
        // debugger;
          //      alert(JSON.stringify(data));
              this.ControlAttributeList = data;
            
              console.log(this.ControlAttributeList);
              
            });
      // this.rest.getRuleTypeList().subscribe((data: {}) => {
      //   // debugger;
      //     //      alert(JSON.stringify(data));
      //         this.RuleTypeList = data;
         
      //         console.log(this.RuleTypeList);
              
      //       });
     }

  onNoClick(): void {
    this.dialogRef.close();
    //this.auth.logout();
  }
  isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
  onYesClick(): void {
    //alert(this.controlAttribute);
    debugger;
    var nameCheck=this.isEmpty(this.name);
    var controlCheck=this.isEmpty(this.controlAttribute);
    if(nameCheck || controlCheck)
    {
      this.toastr.error('Required fields are empty', 'Empty Field!');
    }
    if(!nameCheck && !controlCheck)
    {

      this.saveBody.name=this.name;
      // if(this.isActive==undefined)
      // this.saveBody.isActive=false;
      // else
      // this.saveBody.isActive=true;
      this.filtered=this.ControlAttributeList.filter((items) => items.attributeName === this.controlAttribute)[0];
      //alert(this.filtered);
      console.log(this.filtered);
      this.saveBody.attributeId=this.filtered;
      console.log(this.saveBody);
      debugger;
      this.rest.addRiskControlMatrix(this.saveBody).subscribe((data : any)=>{
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





    } // if fields are not empty working
  
// this.code = new FormGroup({
//   'code': new FormControl(this.code, [
//     Validators.required// <-- Here's how you pass in the custom validator.
//   ])
// });


 }

}


