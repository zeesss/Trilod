import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { RestService } from './../../services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  personList: Array<any> ;
  sessionsList;
  SearchCompanyAndAudit: any;
  endDate;
  startDate;
  StartEndDateSearch;
  controlList: any;
  checkObject: any;
//dialog
  tfn1;
  tfn2;
  sessionId;
  controlsList_dialog: any;

  constructor(public dialog:MatDialog,public toastr:ToastrService,public router:Router,public rest:RestService, public auth:AuthService) { }

  ngOnInit() {
    this.rest.findFormsByUserId(localStorage.getItem("userId")).subscribe((data:any) => {
      debugger;
           this.controlList = data;
       
         console.log("control===="+this.controlList);
         //console.log(this.controlList.filter((item) => item=== "2"));   
         //var task_names = this.controlList.map((task) => task==="1" );       
       
        var myKeys = Object.keys(this.controlList);
        console.log("keys===="+myKeys);
        var matchingKey = myKeys.indexOf("6") !== -1;
        console.log("match===="+matchingKey);
        

        var matchingKeys:any = myKeys.filter(function(key){ return key.indexOf("6") !== -1 });
        console.log("matchkeys===="+matchingKeys);
        console.log(this.controlList[matchingKeys]);
        this.checkObject=this.controlList[matchingKeys];
      //   var matchingValues = matchingKeys.map(function(key){ return this.controlList[key] });
      //   console.log("matchval===="+matchingValues);
         }
         );
    
    this.rest.getSessionsList().subscribe((data:any) => {
      debugger;
       //      alert(JSON.stringify(data));
       if(data.pageName==="login"){
         this.auth.logout();

       }
       else{
           this.sessionsList = data;
         this.personList=this.sessionsList;
           console.log(this.sessionsList);
       }
           
         });
  }
  isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
    
}
  onSubmit() {
    debugger;
    //alert("enter");
    var boolstartdate=this.isEmpty(this.startDate);
    var boolenddate=this.isEmpty(this.endDate);
    var type=this.isEmpty(this.StartEndDateSearch);
  // alert(this.SearchCompanyAndAudit);
    
   // alert(this.SearchCompanyAndAudit.replace(/\s/g, '').length);
    var searchString="";
    if(this.isEmpty(this.SearchCompanyAndAudit))
    {
     // alert("if");
      searchString="!";
    }
    else
    {
      var spaceCheck=this.SearchCompanyAndAudit.replace(/\s/g, '').length;
      if(!spaceCheck)
      {
        searchString="!";
      }
      else
      {
        searchString=this.SearchCompanyAndAudit;

      }
     
    }
   // alert("search "+searchString);
   var onlyTextSearch=false;
   if(boolenddate && boolstartdate && type)
   {
     onlyTextSearch=true;
   }
   else
   {
    if(boolstartdate)
    {
      this.toastr.error('Start Date is required', 'Empty Field!');
    }
    if(boolenddate)
    {
      this.toastr.error('End Date is required', 'Empty Field!');
    }
    if(type)
    {
      this.toastr.error('Selection of Fiscal Start/End is required', 'Empty Selection!');
    }
   }
    
    if(!boolstartdate && !boolenddate && !type)
    {
  
    var d=this.startDate;

   
    var res = d.split('-');
    
    var date = res[1] + '-' + res[2] + '-' + res[0];
  
    var e=this.endDate;
    var res1 = e.split('-');
    var edate = res1[1] + '-' + res1[2] + '-' + res1[0];
    var startEndDateCheck;
    if(this.StartEndDateSearch == "fiscalStartDate")
    {
      startEndDateCheck=true;
    }
    else{
      startEndDateCheck=false;
    }

    this.rest.SessionDateSearch(date,edate,startEndDateCheck,searchString).subscribe((data: any) => {

            
            this.sessionsList = data;
            this.personList=this.sessionsList;
 
            
            
          }
          ,
          (err : HttpErrorResponse)=>{
          
             //alert(err.message);
          this.toastr.error('', 'Failed!');
          
          }
          );
    

    }//if end
    else if(onlyTextSearch)
    {
      var date="01-01-1900";
      var edate="12-01-1900";
      var type=false;
      this.rest.SessionDateSearch(date,edate,type,searchString).subscribe((data: any) => {
        this.sessionsList = data;
         this.personList=this.sessionsList;
      },
      (err : HttpErrorResponse)=>{
          
        alert(err.message);
      this.toastr.error('', 'Failed!');
      
      }
      );
    }
 

    
  }
  addSession(){
    this.router.navigate(['dashboard/newSessionAudit']);
  }
  getWPT(id){
    //alert(id);
localStorage.setItem("editSessionId", id);
this.router.navigate(['dashboard/workPaper']);
  }
  getEventLog(id){
    //alert(id);
localStorage.setItem("editSessionId", id);
this.router.navigate(['dashboard/eventLog']);
  }
  startAudit(id){
    localStorage.setItem('startSessionId', id);
    //this.openDialog();
    this.sessionId=localStorage.getItem("startSessionId");
  this.rest.controlsAgainstSessionId(this.sessionId).subscribe((data:any) => {
    debugger;
         this.controlsList_dialog = data.data[0];
    
         console.log(this.controlsList_dialog);
       });
  }
openDialog(): void {
    let dialogRef = this.dialog.open(StartAudit, {
      width: '600px',
      data: { name:'hi', animal: "hi" }
    });
  
   
  }
  abort(id){
   
    this.rest.abortSessionAudit(id).subscribe((data : any)=>{
      //alert("enter2");
      console.log(data);
      //alert(this.personList);
      if(data.Aborted==="true")
      {
        debugger;
        this.toastr.success('', 'Audit Session Aborted!');
        location.reload();
        //alert("no data found");
      }
      else{
        this.toastr.error('', 'Something went wrong!');
      }
     // alert(this.SearchCompanyAndAudit);
     // console.log(data);

  });

  }
  editSession(id){
    //alert(id);
localStorage.setItem("editSessionId", id);
this.router.navigate(['dashboard/editSessionAudit']);
  }
  search()
  {
    debugger;
   // alert("enter");
   //alert(this.SearchCompanyAndAudit);
   var spaceCheck=this.SearchCompanyAndAudit.replace(/\s/g, '').length;
  //  alert(spaceCheck);
  //  if (!this.SearchCompanyAndAudit.replace(/\s/g, '').length) {
  //   console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
  // }
   if(this.SearchCompanyAndAudit != null && spaceCheck != 0)
   {
    // alert("empty");
     this.rest.searchCompanyAudit(this.SearchCompanyAndAudit).subscribe((data : any)=>{
       //alert("enter2");
       this.personList=data;
       //alert(this.personList);
       if(this.personList.length == 0)
       {
         //alert("no data found");
       }
      // alert(this.SearchCompanyAndAudit);
      // console.log(data);
 
   }
  ,
   (err : HttpErrorResponse)=>{
     //alert(err.error);
     //alert("error");
     alert(err.message);
 
 
       
     // this.toastr.error('Invalid passwords', 'Failed!');
     // this.auth.logout();
   });
   }
   else if(this.SearchCompanyAndAudit == null|| !spaceCheck)
   {
      
    this.rest.getSessionsList().subscribe((data:any) => {
      //debugger; 
       //alert("a");
           this.sessionsList = data;
         this.personList=this.sessionsList;
         
         });

   }
  //  else if(!spaceCheck)
  //  {
  //    alert("space");
  //  }
  
  }// search end
  check()
  {
    alert("keypressed");
  }

  //dialog functions

  executeControl(controlId){
    localStorage.setItem('startControlId',controlId)
    // alert(localStorage.getItem('startSessionId'));
    // alert(controlId);
    let executeBody={
      'controlId':controlId,
      'auditSessionId':localStorage.getItem('startSessionId')
    };
     //alert(executeBody.controlId);
    this.rest.executeControl(executeBody).subscribe((data:any) => {
      debugger;
           //this.controlsList = data.data[0];
      
           console.log(data);
           if(data.responseCode==="00"){
            this.toastr.success('', 'Audit Has been Started!');
            // location.reload();
            var element = document.getElementById("closebutton");
            element.click();
            this.router.navigate(['dashboard/WPT']);
            //location.reload();
           }
           else{
            this.toastr.error('', 'Could not execute control!');

           }
         });
   }

onNoClick(): void {
  //this.dialogRef.close();
  //this.auth.logout();
}

onYesClick(): void {
 
}
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'
 
})
export class StartAudit {
  tfn1;
  tfn2;
  sessionId;
  controlsList: any;
  constructor(
    private router: Router,
    public http:HttpClient, public toastr:ToastrService,
   
    public rest:RestService,
    public dialogRef: MatDialogRef<StartAudit>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  this.sessionId=localStorage.getItem("startSessionId");
  this.rest.controlsAgainstSessionId(this.sessionId).subscribe((data:any) => {
    debugger;
         this.controlsList = data.data[0];
    
         console.log(this.controlsList);
       });

     }
     executeControl(controlId){
      localStorage.setItem('startControlId',controlId)
      // alert(localStorage.getItem('startSessionId'));
      // alert(controlId);
      let executeBody={
        'controlId':controlId,
        'auditSessionId':localStorage.getItem('startSessionId')
      };
       //alert(executeBody.controlId);
      this.rest.executeControl(executeBody).subscribe((data:any) => {
        debugger;
             //this.controlsList = data.data[0];
        
             console.log(data);
             if(data.responseCode==="00"){
              this.toastr.success('', 'Audit Has been Started!');
              this.dialogRef.close();
              this.router.navigate(['dashboard/WPT']);
              //location.reload();
             }
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
   
  }

}

