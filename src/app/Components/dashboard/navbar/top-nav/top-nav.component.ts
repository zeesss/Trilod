'use strict';
import { Component, OnInit, Inject } from '@angular/core';
import { NavService } from '../nav.service';
import { NavItem } from '../../navbar/nav-item';
import { Router } from '@angular/router';
import { RestService } from '../../../services/rest/rest.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '../../../services/utils/utils.service';
import { ToastrService } from 'ngx-toastr';
import { DashTabsComponent } from '../../../dashboard/dash-tabs/dash-tabs.component';



export interface DialogData {


}

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})

export class TopNavComponent implements OnInit {

  user: any;
  name: any;
  searchtext: any;
  patients = [];
  patients1 = [];
  patientDataList: any;
  patientDetails: any;
  hideElement: Boolean;
  formsList: any;
  controlList: any;

  constructor(public dialog: MatDialog, public dashtabs: DashTabsComponent, public router: Router, public rest: RestService, public auth: AuthService, public navService: NavService) {

  }
  closeNav(snav) {
    snav.toggle();
  }
  test: any = {};
  // navItems: NavItem[] = [
  //                        /*{
  //                          displayName: 'Close',
  //                          iconName: 'close',
  //                          // route: 'dashboard/patient-dashboard/patient-encounters',
  //                        },*/
  //                        {
  //                          displayName: 'Home',
  //                          iconName: 'home',
  //                          route: 'dashboard/patient-dashboard',

  //                        },
  //                        {
  //                          displayName: 'Diagnosis',
  //                          iconName: 'add_alert',
  //                          route: 'dashboard/patient-dashboard/patient-encounters',
  //                        },
  //                        {
  //                          displayName: 'Lab Reports',
  //                          iconName: 'list_alt',
  //                          route: 'dashboard/patient-dashboard/lab-reports',
  //                        },
  //                        {
  //                          displayName: 'Allergies',
  //                          iconName: 'pan_tool',
  //                          route: 'dashboard/patient-dashboard/patient-allergies',
  //                        },
  //                        {
  //                          displayName: 'Conditions',
  //                          iconName: 'face',
  //                          route: 'dashboard/patient-dashboard/patient-conditions',
  //                        },
  //                        {
  //                          displayName: 'Medication',
  //                          iconName: 'healing',
  //                          route: 'dashboard/patient-dashboard/patient-medications',
  //                        },
  //                        {
  //                          displayName: 'Immunizations',
  //                          iconName: 'whatshot',
  //                          route: 'dashboard/patient-dashboard/patient-immunizations',
  //                        },
  //                        {
  //                          displayName: 'Notes',
  //                          iconName: 'list_alt',
  //                          route: 'dashboard/patient-dashboard/notes',
  //                        },
  //                        {
  //                          displayName: 'Lab-Charts',
  //                          iconName: 'dashboard',
  //                          route: 'dashboard/patient-dashboard/lab-charts',
  //                        },
  //                        {
  //                          displayName: 'Imaging',
  //                          iconName: 'table_chart',
  //                          route: 'dashboard/patient-dashboard/diagnostic-report',
  //                        },
  //                        {
  //                          displayName: 'Procedures',
  //                          iconName: 'touch_app',
  //                          route: 'dashboard/patient-dashboard/patient-procedures',
  //                        },
  //                        {
  //                            displayName: 'Observations',
  //                            iconName: 'visibility',
  //                            route: 'dashboard/patient-dashboard/patient-observations',
  //                          },
  //                        {
  //                          displayName: 'Comparative Analysis',
  //                          iconName: 'multiline_chart',
  //                          route: 'dashboard/patient-dashboard/lab-analysis-chart',
  //                        },
  //                        {
  //                          displayName: 'Speciality Report',
  //                          iconName: 'insert_chart_outlined',
  //                          route: 'dashboard/patient-dashboard/special-report',
  //                        },
  //                        {
  //                          displayName: 'Vital Charts',
  //                          iconName: 'show_chart',
  //                          route: 'dashboard/patient-dashboard/vital-charts',
  //                        }];
  ngOnInit() {

    this.rest.findFormsByUserId(localStorage.getItem("userId")).subscribe((data: any) => {

      this.controlList = data;

      console.log("control====" + this.controlList);


      var myKeys = Object.keys(this.controlList);
      console.log("keys====" + myKeys);
      var matchingKey = myKeys.indexOf("1") !== -1;
      console.log("match====" + matchingKey);


      var matchingKeys: any = myKeys.filter(function (key) { return key.indexOf("1") !== -1 });
      console.log("matchkeys====" + matchingKeys);
      console.log(this.controlList[matchingKeys]);

    }
    );
    this.rest.getRoleEdit_FormName().subscribe((data: any) => {

      this.formsList = data;

      console.log("forms====" + this.formsList);
    }
    );

  }
  matchKey(id: string) {
    var myKeys = Object.keys(this.controlList);
    //console.log("keys===="+myKeys);
    var matchingKey = myKeys.indexOf(id) !== -1;
    //console.log(matchingKey);
    var matchingKeys: any = myKeys.filter(function (key) { return key.indexOf(id) !== -1 });
    return this.controlList[matchingKeys].canAdd || this.controlList[matchingKeys].canEdit ||
      this.controlList[matchingKeys].canDelete || this.controlList[matchingKeys].canView;
    //return matchingKey;
  }



  redirectTo(uri) {

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }


  logout() {
    this.auth.logout();
  }

  company() {
    this.router.navigate(['dashboard/company']);

  }
  fileType() {
    this.router.navigate(['dashboard/fileType']);

  }
  control() {
    this.router.navigate(['dashboard/control']);

  }
  addTemplate() {
    this.router.navigate(['dashboard/template']);
  }
  rule() {
    this.router.navigate(['dashboard/rule']);
  }
  controlTask() {
    this.router.navigate(['dashboard/controlTask']);
  }
  sessions() {
    this.router.navigate(['dashboard']);
  }
  config() {
    this.router.navigate(['dashboard/config']);
  }
  dashboard() {
    this.router.navigate(['dashboard']);
  }
  eventLog() {
    this.router.navigate(['dashboard/eventLog']);
  }
  WPT() {
    this.router.navigate(['dashboard/workPaper']);
  }
  roles() {
    this.router.navigate(['dashboard/roles']);

  }
  users() {
    this.router.navigate(['dashboard/users']);

  }
  assignForms() {
    this.router.navigate(['dashboard/assignForms']);

  }
  controlAttribute() {
    this.router.navigate(['dashboard/controlAttribute']);

  }
  rcm() {
    this.router.navigate(['dashboard/riskControlMatrix']);

  }
  toExcel() {
    this.router.navigate(['dashboard/convertToExcel']);

  }

  sampleFile() {
    this.router.navigate(['dashboard/sampleFile']);
  }

  auditControl() {
    this.router.navigate(['dashboard/auditControl']);
  }
  openDashboard() {
    /*var element = document.getElementById("home");
   element.classList.add("active");*/
    this.router.navigate(['dashboard']);

  }




}
