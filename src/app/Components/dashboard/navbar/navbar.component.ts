import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {Sort, VERSION} from '@angular/material';
import {NavItem} from './nav-item';
import {NavService} from './nav.service';
import {AuthService} from '../../services/auth/auth.service';
import {RestService} from '../../services/rest/rest.service';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

/* const allPatients=[
  {name:'connie'},
  {name:'joe'},
  {name:'nancy'},
  {name:'wilma'}
  ]; */
@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Home',
      iconName: 'home',
      route: 'dashboard',
    },
    // {
    //   displayName: 'Notes',
    //   iconName: 'list_alt',
    //   route: 'dashboard/patient-dashboard/notes',
    // },
    // {
    //   displayName: 'Vitals',
    //   iconName: 'today',
    //   // route: 'visits',
    // },
    // {
    //   displayName: 'Patients',
    //   iconName: 'people',
    //   // route: 'patients',
    // },
    // {
    //   displayName: 'Lab-Charts',
    //   iconName: 'dashboard',
    //   route: 'dashboard/lab-charts',
    // },
    // {
    //   displayName: 'Lab-Results',
    //   iconName: 'add_alert',
    //   route: 'dashboard/patient-dashboard/lab-reports',
    // },
    // {
    //   displayName: 'Reports',
    //   iconName: 'list_alt',
    //   route: 'dashboard/lab-reports',
    // },
    // {
    //   displayName: 'Allergies',
    //   iconName: 'pan_tool',
    //   route: 'dashboard/patient-allergies',
    // },
    // {
    //   displayName: 'Conditions',
    //   iconName: 'face',
    //   route: 'dashboard/patient-conditions',
    // },
    // {
    //   displayName: 'Medication',
    //   iconName: 'healing',
    //   route: 'dashboard/patient-medications',
    // },
    // {
    //   displayName: 'Immunizations',
    //   iconName: 'whatshot',
    //   route: 'dashboard/patient-immunizations',
    // },
    // {
    //   displayName: 'Notes',
    //   iconName: 'list_alt',
    //   route: 'dashboard/notes',
    // },
    {
      displayName: 'Update Password',
      iconName: 'create',
      route: 'updatepassword'
    },
    {
      displayName: 'Logout',
      iconName: 'logout',
      route: ''
    }
  ];
  patients=[];
  patientDataList :any;
  patientDetails:any;
 pageIndex="";

  constructor(private navService: NavService, private auth: AuthService,private rest: RestService, private router: Router) {
      //this.getPatients(this.pageIndex);
    //this.patients = allPatients.slice();
  }
    getPatients(pageIndex) {

//     this.rest.getPatients(pageIndex).subscribe((data: {}) => {
//
//         //alert(JSON.stringify(data));
//       this.patientDataList = data;
//       this.patientDetails=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       this.patients=this.patientDetails;
//     }
//     ,
//     (err : HttpErrorResponse)=>{
//       this.auth.logout();
//     });
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
  navClick(item) {

      //alert("Hello");


    if ( item.displayName === "Logout") {
      this.auth.logout();
    }
    if(item.displayName==="Update Password")
    {
        this.router.navigate(['updatepassword']);
    }
    this.navService.toggleNav();
  }
//   patientClick(Id:String){
//       this.rest.setPatient(Id);
//       if(window.location.pathname==="/provider/dashboard/patient-dashboard")
//       {
//  this.router.navigate(['dashboard/']);

// //this.router.navigate(['dashboard/patient-dashboard']);
//       }
//       else if ((window.location.pathname==="/provider/dashboard"))
//       {
//           this.router.navigate(['dashboard/patient-dashboard']);
//       }
//       else
//       {
//           this.router.navigate(['dashboard/']);
//    /*  this.router.navigate(['dashboard/patient-dashboard']);
//     location.reload(); */
// }
//     this.navService.toggleNav();
//   }
  search(name){

      console.log(this.patientDetails);
    this.patients = this.patientDetails.filter((item)=>{
        if(item.FirstName.includes(name))
        return true;
        else
        return false;
  });
}
  sortData(sort: Sort) {

    const data = this.patientDetails.slice();
    if (!sort.active || sort.direction === '') {
      this.patients = data;
      return;
    }
    this.patients = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'FirstName': return compare(a.FirstName, b.FirstName, isAsc);
        default: return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
