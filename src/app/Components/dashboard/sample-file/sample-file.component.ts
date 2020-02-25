import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sample-file',
  templateUrl: './sample-file.component.html',
  styleUrls: ['./sample-file.component.scss']
})
export class SampleFileComponent implements OnInit {
  auditListTemp;
  auditList:Array<any>;
  controlL;
  controlList: Array<any> = [];
  uploadForm: FormGroup;
  selected_audit_id;
  selected_control_id;
size;
percentage;
sample;
size1;
option;
audit_file_id: string;
  samplingBody: { "audit_file_id": any; "size": any; "percentage": any; };
  processableBody= { 
    "auditSessionId": "",
    "controlId": "",
    "processableIdsList": []
  };
  fileData: any;
  processedData: any;
  sessionId: string;
  control_hidden=false;
  template_hidden=false;
  audit:any;
  control:any;
  template:any;
  mapData: any;
  mapList: any;
  responseData: any;
  dataList: any;
  arrayToSend: Array<any> = [];
  tableshow=false;
  constructor(public router:Router,public formBuilder:FormBuilder,public toastr:ToastrService,public rest:RestService) { }

  ngOnInit() {
   
    this.audit_file_id=localStorage.getItem("auditFileId");
    this.sessionId=localStorage.getItem("editSessionId");
    this.rest.auditSessionFindByClient(localStorage.getItem("clientId")).subscribe((data: any) => {

      this.auditList = data;
      console.log(this.auditList);
    });
    this.rest.getControlList(localStorage.getItem("clientId")).subscribe((data: {}) => {
      this.controlL = data;
      this.controlList = this.controlL.data;
    });
  }
  addSampling(){
    
    this.selectControl();
    if(this.size=== undefined && this.percentage===undefined)
    {
      alert('Select one option');
    }
    if(this.size!== undefined && this.percentage===undefined)
    {
      this.percentage='0';
    }
    if(this.size=== undefined && this.percentage!==undefined)
    {
      this.size='0';
    }
   // alert(this.size);
   // alert(this.percentage);
//     this.samplingBody={
// "audit_file_id":this.audit_file_id,
// "size":this.size,
// "percentage":this.percentage
//     }
    const formData = new FormData();
    formData.append('audit_session_id', this.selected_audit_id);
    formData.append('control_id', this.selected_control_id);
    formData.append('size',this.size);
    formData.append('percentage',this.percentage);
    
    this.rest.samplingByAuditAndControl(formData).subscribe((data: any) => {
    //this.rest.addSampling(formData).subscribe((data: {}) => {
     
            console.log(data);
            this.dataList=data.data[0];
            console.log(this.dataList);
            // if(data){
             
            //   this.rest.getRowsAfterSampling(this.audit_file_id).subscribe((data: {}) => {
                
            //           console.log(data);
            //           if(data){
            //             console.log(data);
            //             this.fileData=data;
            //             // this.toastr.success('', 'Done!');
                        
            //           }
                      
                      
            //         }
            //         );

            // }
            
            
          }
          );
          if(this.dataList.length>0)
          {
           
            this.tableshow=true;
          }
  }
  changeValue(id: number, property: string, event: any) {
    const checkField = event.target.checked;
    console.log(checkField);
    //this.editField = event.target.textContent;
    
  }
  updateList(rowId:any,id: number, property: string, event: any) {
    const checkField = event.target.checked;
    //console.log(rowId);
    //console.log(checkField);
    const formData = new FormData();
    formData.append('id',rowId);
    formData.append('isProcessable',checkField);
    this.rest.updateSamplingRow(formData).subscribe((data: any) => {
      // debugger;
        //      alert(JSON.stringify(data));
            
       // alert(data);
            console.log(data);
            if(data.success===true){
              console.log(data);
              //localStorage.setItem('auditFileId',data.auditFileId);
              //this.toastr.success('', 'Records updated!');
              //this.router.navigate(['dashboard/sampleFile']);
            }
            
            
          }
          //,
          // (err : HttpErrorResponse)=>{
          
          
          // this.toastr.error('', 'Failed!');
          
          // }
          );
  }
  processData(){
    
    debugger;
    //alert('Hello');
    this.processedData = this.dataList.filter(items => items.isProcessable === true);
    console.log(this.processedData);
    this.arrayToSend = this.processedData.map(a => a.id);
    console.log(this.arrayToSend);
    // for(let i=0;i<=this.processedData.length;i++){
    //   debugger;
    //   alert(this.processedData[i].id);
    //   this.arrayToSend.push(this.processedData[i]);
    //   console.log(this.arrayToSend);
    // }
    
   this.processableBody.auditSessionId=this.selected_audit_id;
   this.processableBody.controlId=this.selected_control_id;
   this.processableBody.processableIdsList=this.arrayToSend;
   console.log(this.processableBody);
    this.rest.sendProcessable(this.processableBody).subscribe((data: any) => {
      debugger;
        //      alert(JSON.stringify(data));
            
       // alert(data);
            console.log(data);
            if(data.responseCode==='00'){
              console.log(data);
              //localStorage.setItem('auditFileId',data.auditFileId);
              this.toastr.success('', 'Rule Applied Successfully!');
              this.router.navigate(['dashboard/sessions']);
            }
            else{
              this.toastr.error('', 'Failed!');
            }
            
            
          }
          //,
         // (err : HttpErrorResponse)=>{
          
          
          // this.toastr.error('', 'Failed!');
          
          // }
          );
  }
  auditSelectOnchange()
  {
    debugger;
    if(this.audit=="")
    {
      this.control_hidden=false;
      this.template_hidden=false;
    }
    else
    this.control_hidden=true;
  }
  controlSelectOnchange()
  {
    if(this.control=="")
    {
      this.template_hidden=false;
    }
    else
    this.template_hidden=true;
  }
  selectControl() {
    //alert();
    debugger;
    //alert(this.audit);
    this.auditList.forEach(element => {
      if(element.auditName===this.audit)
      {
        this.selected_audit_id=element.id;
       // alert(this.selected_audit_id);
      }
    }); 
  //  alert(this.control);
    this.controlList.forEach(element => {
      if(element.name===this.control)
      {
        this.selected_control_id=element.id;
     //   alert(this.selected_control_id);
      }
    });
    //alert(this.selected_audit_id);
    //alert(this.selected_control_id);
    this.rest.getSamplingRows(this.selected_audit_id,this.selected_control_id).subscribe((data: any) => {
       //alert((data.responseCode));
      this.responseData=data.data;
      this.mapList=this.responseData.colNamesList;
      this.mapData=this.responseData.colNamesMap;
       console.log(data);
       //alert(this.matchKey("col1"));
    });
    
    // this.disableAll = true;
    // this.showcard = true;
    // this.controlList.forEach(element => {
    //   if (element.name == this.control) {
    //     this.controlID = element.id;
    //   }
    // });
    // this.rest.getControlFieldName(this.controlID).subscribe((data: {}) => {
    //   this.controlFN = data;
    //   this.controlFieldName = this.controlFN.data;
    // });
  }
  matchKey(id: string) {
    var myKeys = Object.keys(this.mapData);
    console.log("keys===="+myKeys);
    var matchingKey = myKeys.indexOf(id) !== -1;
   console.log(matchingKey);
    var matchingKeys: any = myKeys.filter(function (key) { return key.indexOf(id) !== -1 });
    //return this.mapList[matchingKeys] ;
    return matchingKeys;
  }
  deselectControl() {
    this.control_hidden=false;
    this.control="";
    this.audit="";
    // this.disableAll = false;
    // this.showcard = false;
  }
  getData(){
    const formData = new FormData();
    formData.append('size', this.size);
    formData.append('percentage', this.percentage);
    formData.append('audit_session_id', this.selected_audit_id);
    formData.append('control_id', this.selected_control_id);
  }
}
