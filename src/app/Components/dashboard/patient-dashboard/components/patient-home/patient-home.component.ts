'use strict';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilsService } from '../../../../services/utils/utils.service';
import { Router } from '@angular/router';
import { RestService } from '../../../../services/rest/rest.service';
import {Injectable} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../services/auth/auth.service';
import { OrderPipe } from 'ngx-order-pipe';
import { Pipe, PipeTransform } from '@angular/core';
export interface DialogData {
	
	      
    animal: string;
    name: string;
	Type: string;
	priority: string;
	DateTime: string;
	EndDateTime: string;
	reason: string;
	Locations: string;

	
}
@Component({
    selector: 'app-patient-home',
    templateUrl: './patient-home.component.html',
    styleUrls: ['./patient-home.component.scss']
})





export class PatientHomeComponent implements OnInit {
    Id:String;
    // patientDataList:any = [];
patientDataList1:any=[];
Procedures: any;

patientDataList:any = {
    "Allergies": [],
    "Conditions": [],
    "Medications": [],
    "Procedures": [],
    "Encounters": []
}

    constructor(private orderPipe: OrderPipe,public auth: AuthService, public rest: RestService, private router: Router, public dialog: MatDialog, public utilsvc: UtilsService) {
    }

    ngOnInit() {

        //this.Id=this.rest.getPatient();
        //this.getPatientData(this.Id);
    }
    medicationsPage(){
        this.router.navigate(['/dashboard/patient-dashboard/patient-medications']);
        //this.router.navigateByUrl('medication');
        //this.router.navigateByUrl('/facebook-analysis');
    }
    
       proceduresPage(){
        this.router.navigate(['/dashboard/patient-dashboard/patient-procedures']);
     
    }
    
    
       allergiesPage(){
        this.router.navigate(['/dashboard/patient-dashboard/patient-allergies']);
     
    }
    
     conditionsPage(){
        this.router.navigate(['/dashboard/patient-dashboard/patient-conditions']);
     
    }
    
    encountersPage(){
        this.router.navigate(['/dashboard/patient-dashboard/patient-encounters']);
     
    }
    text_truncate(str, length, ending) {
        if (length == null) {
          length = 10;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      };
   

    /*get filterByStatus() {
        return this.patientDataList.Procedures.filter( x => x.Status ==='Incomplete');
      }*/
    xyz = "khalil";
    
    sortProcedures(field: string) {
debugger;
        this.patientDataList.Procedures.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return -1;
            } else if (a[field] > b[field]) {
                return 1;
            } else {
                return 0;
            }
        });
        this.patientDataList1 = this.patientDataList.Procedures;
}
isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
  

    replaceDashFunc(value) {
        var res = value.split("-");
        return res = res.join("/");

    }
    colorClassIndex = 0;
    colorClassesBadge = ["primary", "success", "info", "danger", "warning"];
    increamentColorIndex() {
        this.colorClassIndex = this.colorClassIndex + 1;
        this.colorClassIndex = this.colorClassIndex % 5;
    }
    openDialog(encount): void {
        console.log(encount.class);
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '1250px',
            data: encount
        });

        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
        //   this.animal = result;
        // });
    }

}
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, public utilsvc: UtilsService,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
