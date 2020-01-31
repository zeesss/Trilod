import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.scss']
})
export class EditSessionComponent implements OnInit {
  con :Boolean;
  FulFillDate: any;
  fiscalStartDate;
  fiscalEndDate;
  CompanyList;
  FileTypeList;
  RuleTypeList;
  PopulationList;
  ControlTaskList;
  session;
startDate;
endDate;
controlTaskFromAudit;
fieldArray;
newAttribute={
  "id":"",
  "code":"",
  "description":"",
"businessRule":"",
"ruleType":"",

"fileTypeId":{"id":"",
"name":""},
"isActive":"",
"createDate":""
};
editField;
updateBody;
personList;
file;
code;
company;
address;
clientName;
  editsessionObject: {"status":any;"id": any; "clientIdTransient": any; "auditName": any; "fiscalStartDate": any; "fiscalEndDate": any; "address": any; "city": any; "state": any; "zip": any; "auditFileList": any[]; };
  requestedDate: any;
  requestedData: any;
  fulfillDate:any;
  name: any;
  populationObject: {"id":any; "requestedData": any; "requestedDate": any; "fulfillDate":  any; "auditSessionId": any; };
  auditName: any;
  populationId: any;
  config: any;
  constructor(public toastr:ToastrService,public router: Router,public rest : RestService) { }

  ngOnInit() {
    //alert(localStorage.getItem("editSessionId"));
this.rest.findSession(localStorage.getItem("editSessionId")).subscribe((data : any)=>{
  if(data)
  {this.session=data;
    this.company=this.session.clientId;
    console.log(this.company);
    
    this.address=this.session.clientId.address;
    this.auditName=this.session.auditName;
    this.fiscalStartDate=this.session.fiscalStartDate;
    this.fiscalEndDate=this.session.fiscalEndDate;
    console.log(this.session.clientId.clientName);

  }
  
});
this.rest.findControlTaskFromAudit(localStorage.getItem("editSessionId")).subscribe((data : any)=>{
  if(data)
  {
    console.log(data);
    this.controlTaskFromAudit=data;
    this.fieldArray=this.controlTaskFromAudit;

  }
  
});
this.rest.configFindBySessionId(localStorage.getItem("editSessionId")).subscribe((data : any)=>{
  if(data)
  {
    this.con=true;
    console.log(data);
    this.config=data;
   

  }
  
  
},
(err : HttpErrorResponse)=>{
          
  this.con=false;        
  this.toastr.error('', 'Please Add Configuration First!');
  //this.router.navigate(['dashboard/config']);
  
  }
);

this.rest.getCompanyList().subscribe((data: {}) => {
      
  this.CompanyList = data;            
});
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
      this.rest.findPopulationFromAudit(localStorage.getItem("editSessionId")).subscribe((data: {}) => {
        // debugger;
          //      alert(JSON.stringify(data));
              this.PopulationList = data;
         this.requestedData=this.PopulationList[0].requestedData;
         this.requestedDate=this.PopulationList[0].requestedDate;
         this.fulfillDate=this.PopulationList[0].fulfillDate;
         this.populationId=this.PopulationList[0].id;
              console.log("pop Id======"+this.populationId);
              
            });
            this.rest.getControlTaskListOnlyActive().subscribe((data: {}) => {
            
              this.ControlTaskList = data;  
              this.personList= this.ControlTaskList;  
              this.code = this.ControlTaskList.map(function(a) {return a.code;}); 
              console.log(this.code ) ;    
            });

  }
  onChange(value) {
    debugger;
    this.company=this.CompanyList.filter((items) => items.clientName === value.split(": ").pop())[0];
    this.address=this.CompanyList.filter((items) => items.clientName === value.split(": ").pop())[0].address;
    this.clientName=this.company.clientName;
    console.log(this.address);
  }
  getrow(){
    this.newAttribute=this.ControlTaskList.filter((items) => items.code === this.newAttribute.code)[0];
    //this.newAttribute.description=this.ControlTaskList.filter((items) => items.code === this.newAttribute.code)[0].description;
    //this.newAttribute.businessRule=this.ControlTaskList.filter((items) => items.code === this.newAttribute.code)[0].businessRule;
    console.log(this.newAttribute);
  }
  changeValue(id: number, property: string, event: any) {
    debugger;
    this.editField = event.target.textContent;
    if(property==="description")
    this.newAttribute.description=this.editField;
    else
    this.newAttribute.businessRule=this.editField;
  }
  changeValue1(id: number, property: string, event: any) {
    debugger;
    this.editField = event.target.textContent;
   
  }
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

        }
  }
  addFieldValue() {
    debugger;
    console.log(this.newAttribute);
    this.fieldArray.push(this.newAttribute);
    console.log(this.fieldArray);
    this.newAttribute = {"id":"",
    "code":"",
    "description":"",
  "businessRule":"",
  "ruleType":"",
  
  "fileTypeId":{"id":"",
  "name":""},
  "isActive":"",
  "createDate":""};
  console.log(this.newAttribute);
}
addConfig(){
  this.router.navigate(['dashboard/config']);
}
isEmpty(val){
  return (val === undefined || val == null || val.length <= 0) ? true : false;
}
editSessionAudit(){
  if(  this.fieldArray.length>0 )
{
  console.log(this.requestedData);
  console.log(this.requestedDate);
  console.log(this.fulfillDate);
  console.log(this.fieldArray);
  console.log(this.company);
  console.log(this.address);
  console.log(this.name);
  console.log(this.startDate);
  console.log(this.endDate);
  this.editsessionObject={
    "id":localStorage.getItem("editSessionId"),
   "clientIdTransient":this.company.id,
   "auditName": this.auditName,
   "fiscalStartDate": this.fiscalStartDate,
   "fiscalEndDate":this.fiscalEndDate,
   "status":this.session.status,
   "address": this.address,
   "city": this.company.city,
   "state": this.company.state,
   "zip": this.company.zip,
   "auditFileList":[]
 }
 this.populationObject={
   "id":this.populationId,
   "requestedData": this.requestedData,
   "requestedDate": this.requestedDate,
   "fulfillDate": this.fulfillDate,
   "auditSessionId": ""
 }
 this.rest.updateSessionAudit(this.editsessionObject).subscribe((data : any)=>{
   //console.log(data);
   if(data){
     debugger;
         
     const sessionid=localStorage.getItem("editSessionId");
     this.populationObject.auditSessionId=sessionid;
     console.log(this.fieldArray);
     this.rest.updateControlTaskFromSessionAudit(sessionid,this.fieldArray).subscribe((data : any)=>{
      //console.log(data);
      if(data){
        debugger;
        this.rest.updatePopulationFromSessionAudit(this.populationObject).subscribe((data : any)=>{
          //console.log(data);
          if(data){
            debugger;
            alert("Data Edited!!!");
            this.router.navigate(['dashboard/sessions']);
          }
        }); 
        
      }
    }); 
  
   
   }
 });
}
else{
  this.toastr.error('', 'Enter all required fields!');

}
 }
 deleteControl(i, rowId){
  if(confirm("Are you sure to delete the record?")) {
            this.toastr.success('', 'Record deleted!');
            this.fieldArray.splice(rowId, 1); 
  }
  
  


}
remove(id: any, rowId) {
  //this.confirmed=this.openConfirmationDialog1();
  //this.openConfirmationDialog1();
  this.deleteControl(id,rowId);
   //this.personList.splice(rowId, 1);
}
 addFile(){
   debugger;
  this.router.navigate(['dashboard/import-file']);
 }
 sampleFile(){
   console.log(this.session);
  localStorage.setItem("auditFileId",this.session.auditFileList[0].id);
  this.router.navigate(['dashboard/sampleFile']);
 }
 sample(){
  this.router.navigate(['dashboard/sampleFile']);
 }

}
