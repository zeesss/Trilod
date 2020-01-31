//import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { from, empty } from 'rxjs';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {
  RoleList:Array<any> ;
  RoleDropDownSelectionList:Array<any>=[] ;
  Temp_RoleDropDownSelection:Array<any>=[] ;
  formList:Array<any> =[];
  temp_formList1:Array<any>=[] ;
  formList1:Array<any>=[] ;
  editField: string;
  updateRoleSelectionList:Array<any>=[];
 selectRoleId;
  i;
  j;
  k;
  l;
  m=0;
  formBody={
    
      "id": "",
      "textToDisplay": "",
      "path": ""
  
  };
  formBody1={
    
    "id": "",
    "textToDisplay": "",
    "path": ""

};
updateBody={

  "canAdd": false,
  "canEdit": false,
  "canDelete": false,
  "canView": false,
  "formId": 0
};
SelectionRoleName;
store;
UpdateListOfSelection:Array<any> ;
  

  constructor(public auth:AuthService,public toastr:ToastrService, public dialog:MatDialog,public rest:RestService, public http:HttpClient) { }

  ngOnInit() {
    this.rest.getRoleEdit_RoleList().subscribe((data:any) => {
      debugger;
       //      alert(JSON.stringify(data));
       if(data.pageName==="login"){
         this.auth.logout();

       }
       else{
           this.RoleList=data;
           //get role access api call start
           this.rest.getRoleDropDown_SelectionList(this.RoleList[0].id).subscribe((data:any) => {
           debugger;
                this.selectRoleId=this.RoleList[0].id;
                 this.RoleDropDownSelectionList=data;
                 this.Temp_RoleDropDownSelection=this.RoleDropDownSelectionList;
              //   console.log(this.RoleDropDownSelectionList);
              //   console.log(this.RoleDropDownSelectionList.length);
                 //get form name api start
                 //get all forms data in form list
                 this.rest.getRoleEdit_FormName().subscribe((data:any) => {
                  debugger;
                       this.formList=data;
                       this.formList1=this.formList;
                      // console.log(this.formList); 
                       //alert(this.formList.length);
                       
                       //alert(JSON.stringify(this.formList));
                   
                     this.i=0;
                     this.j=0;
                     this.k=0;
                     //formList data is undefined
                     //alert(JSON.stringify(this.formList));
                     debugger;  // debug these loop
                     while(this.i<this.RoleDropDownSelectionList.length)
                     {
                    //   console.log(this.i);
                       //select 0
                       while(this.j<this.formList.length)
                       {
                       //  console.log(this.j);
                         if(this.RoleDropDownSelectionList[this.i].formId==this.formList[this.j].id)
                         {
                           this.formBody[this.k++]=this.formList[this.j];
                           console.log(this.formBody);
                           //alert(JSON.stringify(this.formBody));
                         }
                         this.j++;
                       }
                       this.i++;
                     }
                    }
                    );
                 //form name api end
               }
               ,
               
               (err : HttpErrorResponse)=>{
               
               
               this.toastr.error(err.message, 'Failed!');
              // alert(err.message);
               
               }
              

               
               );
           //get role access api call end
           
       }// auth else end
           
         }
         
         );
  }
  updateRole( event: any)
  {
 debugger;
   // alert("entter");
    var selectField = event.target.value;
    //alert("Role List");
    //alert(JSON.stringify(this.RoleList));
  //  alert(selectField);
    //alert(JSON.stringify(this.RoleDropDownSelectionList));
    var w=0;
    var role_listId;
    while(w<this.RoleList.length)
    {
      if(this.RoleList[w].roleName==selectField)
      {
        role_listId=this.RoleList[w].id;
        break;
      }
      w++;
    }
   // alert(role_listId);
    this.selectRoleId=role_listId;
    this.rest.getRoleDropDown_SelectionList(role_listId).subscribe((data:any) => {
      debugger;
       //alert("enter");
            this.RoleDropDownSelectionList=data;
            this.Temp_RoleDropDownSelection=this.RoleDropDownSelectionList;
            console.log(this.Temp_RoleDropDownSelection);
         //   alert(this.RoleDropDownSelectionList.length);
            // alert("list");
            // if(this.RoleDropDownSelectionList.length==0)
            // alert("empty");
            // alert(JSON.stringify(this.RoleDropDownSelectionList));
             
    });
    setTimeout(()=>{ this.ordering_FormList()}, 1000);
  // this.ordering_FormList();
    //this.ordering_FormList();
    
  }// update role end
  ordering_FormList()
  {
    debugger;
 //Set ordering of Form names according to ordering of check boxes store in list
 var a=0;

 this.temp_formList1=[];
 this.formList1=[];
// alert(this.RoleDropDownSelectionList.length);
// alert("Role list");
//alert(JSON.stringify(this.RoleDropDownSelectionList));
 //console.log(this.RoleDropDownSelectionList);
//  this.RoleDropDownSelectionList.forEach(element => {
   for(var b=0;b<this.formList.length;b++)
   {
     
   a++;
   debugger;
   this.formList.forEach(form => {
     debugger;
   //  console.log("form id"+form.id);
  //   console.log(this.RoleDropDownSelectionList[b].formId);
    // alert("form id"+form.id);
    // alert("element id"+element.formId);
     if(form.id==this.RoleDropDownSelectionList[b].formId)
     {
      // alert("enter in if");
     //  alert(JSON.stringify(form));
       this.temp_formList1.push(form);
     //  console.log(this.temp_formList1);
      // alert(JSON.stringify(this.temp_formList1));
     }
   });


 }
 // console.log(this.temp_formList1);
 this.formList1=this.temp_formList1;
 //alert("listt");
 //alert(JSON.stringify(this.formList1));
 
  }
  changeValue(id: number, property: string, event: any) {
   // alert("enter");
    this.editField = event.target.textContent;   
  }
  SelectionList()
  {
    //alert(id);
    //alert("enter");
    //alert(JSON.stringify(this.RoleDropDownSelectionList));
    // console.log(this.RoleDropDownSelectionList);
    // console.log(this.formList[this.m].id);
    while(this.formList[this.m].id)
    {
      //alert(this.formBody[this.j].textToDisplay);
     // console.log(this.formList[this.m].textToDisplay);
      this.SelectionRoleName=this.formList[this.m].textToDisplay;
      return this.formList[this.m++].textToDisplay;
      

    }
    this.m++;


  }
  
  SelectionList2(id: string)
  {
    //alert(id);
    //alert("enter");
    //alert(JSON.stringify(this.RoleDropDownSelectionList));
    console.log(this.RoleDropDownSelectionList);
    console.log(this.formList[this.m].id);
    while(this.formList[this.m].id==id)
    {
      //alert(this.formBody[this.j].textToDisplay);
      console.log(this.formList[this.m].textToDisplay);
      this.SelectionRoleName=this.formList[this.m].textToDisplay;
      return this.formList[this.m++].textToDisplay;
      

    }
    this.m++;


  }
  PropertyBody(formId:number,property: string,event: any)
  {
    if(property=="canAdd")
    {
      this.updateBody={

        "canAdd": event.target.checked,
        "canEdit": false,
        "canDelete": false,
        "canView": false,
        "formId": formId
      };
    }
    else if(property=="canView")
    {
      this.updateBody={

        "canAdd": false,
        "canEdit": false,
        "canDelete": false,
        "canView": event.target.checked,
        "formId": formId
      };
    }
    else if(property=="canEdit")
    {
      this.updateBody={

        "canAdd": false,
        "canEdit": event.target.checked,
        "canDelete": false,
        "canView": false,
        "formId": formId
      };
    }
    else
    {
      this.updateBody={

        "canAdd": false,
        "canEdit": false,
        "canDelete": event.target.checked,
        "canView": false,
        "formId": formId
      };
    }


  }
  Save(formName:string, property: string,event: any,formID:number,formNameORId:string)
  {
   // console.log("Form Name Parameter: "+formName);
   // console.log("Form Name Parameter: "+formID);
   // alert("1 list length "+this.RoleDropDownSelectionList.length);
    //alert("enter save");
    debugger;
    const checkField = event.target.checked;
    var w=0;
    var formId;
    if(formNameORId=="formname")
    {
    this.formList.forEach(element => {
      debugger;
     // console.log(element.textToDisplay);
      //console.log(formName);
      if(element.textToDisplay==formName)
      {
        console.log(this.formList[w].textToDisplay);
        formId=this.formList[w].id;
      }
      else
      w++;
    });
  }
  else
  {
    formId=formID;
  }
  //alert(formId);
  //alert("2 list length"+this.RoleDropDownSelectionList.length);
   // console.log(this.Temp_RoleDropDownSelection);
    if(this.Temp_RoleDropDownSelection.length==0)
    {
     // alert("10 list length"+this.RoleDropDownSelectionList.length);
      this.PropertyBody(formId,property,event);
     // alert("11.0 list length"+this.RoleDropDownSelectionList.length);
      //console.log("Update");
     // console.log(this.updateBody);
     // alert("11.1 list length"+this.RoleDropDownSelectionList.length);
      // this.RoleDropDownSelectionList.push(this.updateBody);
     // this.Temp_RoleDropDownSelection.push(this.updateBody);
     this.Temp_RoleDropDownSelection.push(this.updateBody);
     console.log(this.Temp_RoleDropDownSelection);
     this.RoleDropDownSelectionList=[];
    //  alert("11.2 list length"+this.RoleDropDownSelectionList.length);
     // alert(JSON.stringify(this.RoleDropDownSelectionList)); 
      //console.log("List store");
    //  console.log(this.Temp_RoleDropDownSelection);
     // alert("13 list length"+this.RoleDropDownSelectionList.length);
      this.updateBody={

        "canAdd": false,
        "canEdit": false,
        "canDelete": false,
        "canView": false,
        "formId": 0
      };
   //   alert("14 list length"+this.RoleDropDownSelectionList.length);
    }
   // console.log(this.Temp_RoleDropDownSelection);
      else  if(this.Temp_RoleDropDownSelection.length>0)
      {
       // alert("3 list length"+this.RoleDropDownSelectionList.length);
        debugger;
        var formNameExitOnList=false;
        var formExitonWhichId;
        for(var e=0;e<this.Temp_RoleDropDownSelection.length;e++)
        {
          if(this.Temp_RoleDropDownSelection[e].formId==formId)
          {
            formNameExitOnList=true;
            formExitonWhichId=e;
          }
        }
      //  alert("4 list length"+this.RoleDropDownSelectionList.length);
        if(formNameExitOnList)
        {
        //  alert("5 list length"+this.RoleDropDownSelectionList.length);
          this.Temp_RoleDropDownSelection[formExitonWhichId][property] = checkField; //updating value of check box
          console.log("after changing value");
          console.log(this.Temp_RoleDropDownSelection);
        //  alert("6 list length"+this.RoleDropDownSelectionList.length);
        }
        else
        {
         // alert("7 list length"+this.RoleDropDownSelectionList.length);
          this.PropertyBody(formId,property,event);
          this.Temp_RoleDropDownSelection.push(this.updateBody);
        //  console.log(this.Temp_RoleDropDownSelection);
        //  alert("8 list length"+this.RoleDropDownSelectionList.length);
          this.updateBody={
    
            "canAdd": false,
            "canEdit": false,
            "canDelete": false,
            "canView": false,
            "formId": 0
          };
        }


      }
      //console.log("list length"+this.updateRoleSelectionList.length);
      //alert("9 list length"+this.RoleDropDownSelectionList.length);
    
  } // save funtion end
  // Save(formName:string, property: string,event: any)
  // {
  //   alert("enter save");
  //   debugger;
  //   const checkField = event.target.checked;
  //   var w=0;
  //   var formId;
  //   this.formList.forEach(element => {
  //     if(element.textToDisplay==formName)
  //     {
  //       console.log(this.formList[w].textToDisplay);
  //       formId=this.formList[w].id;
  //     }
      
  //   });
  //   console.log(this.Temp_RoleDropDownSelection);
  //   if(this.Temp_RoleDropDownSelection.length==0)
  //   {
  //     this.PropertyBody(formId,property,event);
  //     // this.RoleDropDownSelectionList.push(this.updateBody);
  //     this.Temp_RoleDropDownSelection.push(this.updateBody);
  //     console.log(this.Temp_RoleDropDownSelection);
  //     this.updateBody={

  //       "canAdd": false,
  //       "canEdit": false,
  //       "canDelete": false,
  //       "canView": false,
  //       "formId": 0
  //     };
  //   }
  //  // console.log(this.Temp_RoleDropDownSelection);
  //     else  if(this.Temp_RoleDropDownSelection.length>0)
  //     {
  //       debugger;
  //       var formNameExitOnList=false;
  //       var formExitonWhichId;
  //       for(var e=0;e<this.Temp_RoleDropDownSelection.length;e++)
  //       {
  //         if(this.Temp_RoleDropDownSelection[e].formId==formId)
  //         {
  //           formNameExitOnList=true;
  //           formExitonWhichId=e;
  //         }
  //       }
  //       if(formNameExitOnList)
  //       {
  //         this.Temp_RoleDropDownSelection[formExitonWhichId][property] = checkField; //updating value of check box
  //         console.log(this.Temp_RoleDropDownSelection);
  //       }
  //       else
  //       {
  //         this.PropertyBody(formId,property,event);
  //         this.Temp_RoleDropDownSelection.push(this.updateBody);
  //         console.log(this.Temp_RoleDropDownSelection);
  //         this.updateBody={
    
  //           "canAdd": false,
  //           "canEdit": false,
  //           "canDelete": false,
  //           "canView": false,
  //           "formId": 0
  //         };
  //       }


  //     }
  //     console.log("list length"+this.updateRoleSelectionList.length);
  //     alert("list length"+this.updateRoleSelectionList.length);
    
  // } // save funtion end
  OnSave()
  {
    //  alert(JSON.stringify(this.updateRoleSelectionList)); 
      this.Temp_RoleDropDownSelection.forEach(element => {
      debugger;
      this.updateBody.canAdd=element.canAdd;
      this.updateBody.canEdit=element.canEdit;
      this.updateBody.canDelete=element.canDelete;
      this.updateBody.canView=element.canView;
      this.updateBody.formId=element.formId;
      //alert(JSON.stringify(this.updateBody)); 
    //  console.log(this.updateBody);
      //storing all the formList on roles that are not stored
      this.updateRoleSelectionList = this.updateRoleSelectionList || [];
      this.updateRoleSelectionList.push(this.updateBody);
     // console.log("List of checked");
     // console.log(this.updateRoleSelectionList);
      this.updateBody={

        "canAdd": false,
        "canEdit": false,
        "canDelete": false,
        "canView": false,
        "formId": 0
      };  
     // console.log(this.updateRoleSelectionList);
    });
    var formNameExitOnList=false;
    var formExitonWhichId;
    debugger;
    this.formList.forEach(element => {
      debugger;
      console.log(element);
      for(var e=0;e<this.Temp_RoleDropDownSelection.length;e++)
      {
        debugger;
        if(this.Temp_RoleDropDownSelection[e].formId==element.id)
        {
          debugger;
          formNameExitOnList=true;
          formExitonWhichId=e;
          break;
        }
        else{
          formNameExitOnList=false;
        }
      }
      if(!formNameExitOnList)
      {
        debugger;
        this.updateBody={

          "canAdd": false,
          "canEdit": false,
          "canDelete": false,
          "canView": false,
          "formId": element.id
        };  
       // console.log("store more list");
       // console.log(this.updateBody);
        this.updateRoleSelectionList.push(this.updateBody);
        this.updateBody={
  
          "canAdd": false,
          "canEdit": false,
          "canDelete": false,
          "canView": false,
          "formId": 0
        };  
      }
   
      
    });
 //   console.log("final list");
  //  console.log(this.updateRoleSelectionList);
    this.rest.saveRoleEdit_Selection(this.selectRoleId,this.updateRoleSelectionList).subscribe((data: {}) => {
     // alert("enter");
 
     // console.log("data saved"+data);
      //for getting updated list data
      this.rest.getRoleDropDown_SelectionList(this.selectRoleId).subscribe((data:any) => {
        debugger;
            // this.selectRoleId=this.RoleList[0].id;
              this.RoleDropDownSelectionList=data;
             // console.log(this.RoleDropDownSelectionList);
      });

      // alert(data[0].error);
      
        this.toastr.success('', 'Records updated!');
        this.updateRoleSelectionList=null;
        this.Temp_RoleDropDownSelection=null;
        this.Temp_RoleDropDownSelection=this.updateRoleSelectionList;// when again update check boxes list 2 has updated data
    
      
      
    },
    (err : HttpErrorResponse)=>{
    
    
    this.toastr.error('', 'Failed!');
    
    }
    );
  }
  
  updateList(controlId:any,id: number, property: string, event: any) {
    if(confirm("Are you sure to edit the record?")){
    debugger;
    const editField = event.target.textContent;
    var selectField = event.target.value;
    const checkField = event.target.checked;
    this.RoleDropDownSelectionList[id][property] = checkField;
    // console.log("Role List");
    // console.log(this.RoleDropDownSelectionList);
    // console.log(controlId);
    // console.log(this.RoleDropDownSelectionList.filter((items) => items.id === controlId)[0]);
    this.store=this.RoleDropDownSelectionList.filter((items) => items.id === controlId)[0];
    console.log("Update List");
    //alert("Update List");
   // console.log(this.store);
    if(property==="canView" ||property==="canAdd" ||property==="canEdit" ||property==="canDelete" )
    {
      //this.updateBody.isActive=checkField;
      //alert("in");
      this.RoleDropDownSelectionList.forEach(element => {
        debugger;
        this.updateBody.canAdd=element.canAdd;
        this.updateBody.canEdit=element.canEdit;
        this.updateBody.canDelete=element.canDelete;
        this.updateBody.canView=element.canView;
        this.updateBody.formId=element.formId;
        //alert(JSON.stringify(this.updateBody)); 
       // console.log(this.updateBody);
        this.updateRoleSelectionList.push(this.updateBody);
        this.updateBody={

          "canAdd": false,
          "canEdit": false,
          "canDelete": false,
          "canView": false,
          "formId": 0
        };  
       // console.log(this.updateRoleSelectionList);
      });
      
       // alert(JSON.stringify(this.updateRoleSelectionList));
       // console.log(this.updateRoleSelectionList);
        //alert(this.store.roleId.id);
        this.rest.saveRoleEdit_Selection(this.store.roleId.id,this.updateRoleSelectionList).subscribe((data: {}) => {
         // alert("enter");
     
          console.log("data saved"+data);
        //  alert(data[0].error);
          if(data[0].error == null){
            this.toastr.success('', 'Records updated!');
          }
          
          
        },
        (err : HttpErrorResponse)=>{
        
        
        this.toastr.error('', 'Failed!');
        
        }
        );
    }
        
 }
  
 } //Update list end

}
