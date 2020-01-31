import { Component, OnInit } from '@angular/core';
import { NavItem } from '../navbar/nav-item';
import {UtilsService} from '../../services/utils/utils.service';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest/rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
    patientDataList:any={
    "PatientData": {
     "Emails":[]
    }
    };
    patientDetails:any=[];
    patientVitals:any=[];

    HeightList: any = [];
    lastHeight:any=[];
    WeightList: any = [];
    lastWeight:any=[];
    TempratureList: any = [];
    lastTemp:any=[];
    
    BMIList: any = [];
    lastBMI:any=[];
    RespirationRateList: any = [];
    lastRespiration:any=[];
    Heart_RateList: any = [];
    lastHeart:any=[];
    Intravascular_SystolicList: any = [];
    lastSystolic:any=[];
    Intravascular_DiastolicList: any = [];
    lastDiastolic:any=[];
    vitals:any=[];

   // Id=this.rest.getPatient();
    

  showFiller = false;
  avatarUrl = {
    'background-image':'url(\'https://static.turbosquid.com/Preview/2016/12/21__04_11_05/cover1200x1200_00000.jpg7719D5E2-9D61-4FF2-B3BF-1F56629E0412Res200.jpg\')'
  }

  constructor(public auth:AuthService,public rest:RestService,private router:Router,public utilsvc: UtilsService) { }
  
  isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
    }
  navItems: NavItem[] = [
    {
      displayName: 'Close',
      iconName: 'close',
      // route: 'dashboard/patient-dashboard/patient-encounters',
    },
    {
      displayName: 'Home',
      iconName: 'home',
      route: 'dashboard/patient-dashboard',

    },
    {
      displayName: 'Diagnosis',
      iconName: 'add_alert',
      route: 'dashboard/patient-dashboard/patient-encounters',
    },
    {
      displayName: 'Lab Reports',
      iconName: 'list_alt',
      route: 'dashboard/patient-dashboard/lab-reports',
    },
    {
      displayName: 'Allergies',
      iconName: 'pan_tool',
      route: 'dashboard/patient-dashboard/patient-allergies',
    },
    {
      displayName: 'Conditions',
      iconName: 'face',
      route: 'dashboard/patient-dashboard/patient-conditions',
    },
    {
      displayName: 'Medication',
      iconName: 'healing',
      route: 'dashboard/patient-dashboard/patient-medications',
    },
    {
      displayName: 'Immunizations',
      iconName: 'whatshot',
      route: 'dashboard/patient-dashboard/patient-immunizations',
    },
    {
      displayName: 'Notes',
      iconName: 'list_alt',
      route: 'dashboard/patient-dashboard/notes',
    },  
    {
      displayName: 'Lab-Charts',
      iconName: 'dashboard',
      route: 'dashboard/patient-dashboard/lab-charts',
    }, 
    {
      displayName: 'Imaging',
      iconName: 'table_chart',
      route: 'dashboard/patient-dashboard/diagnostic-report',
    },
    {
      displayName: 'Procedures',
      iconName: 'touch_app',
      route: 'dashboard/patient-dashboard/patient-procedures',
    },
    {
        displayName: 'Observations',
        iconName: 'visibility',
        route: 'dashboard/patient-dashboard/patient-observations',
      },
    {
      displayName: 'Comparative Analysis',
      iconName: 'multiline_chart',
      route: 'dashboard/patient-dashboard/lab-analysis-chart',
    },
    {
      displayName: 'Speciality Report',
      iconName: 'insert_chart_outlined',
      route: 'dashboard/patient-dashboard/special-report',
    },
    {
      displayName: 'Vital Charts',
      iconName: 'show_chart',
      route: 'dashboard/patient-dashboard/vital-charts',
    }];

  temp1:any={};
  temp2:any={};
  ngOnInit() {
      this.lastTemp[0]={};
       //alert(this.Id);
       //this.getPatientData(this.Id);
  }
  openPatientDashboard(){
      /*var element = document.getElementById("home");
      element.classList.remove("active");*/
      this.router.navigate(['dashboard/patient-dashboard']);
  }
//   getPatientData(Id:any)
//   {
//       this.rest.getPatientDataOnId(Id).subscribe((data: {}) => {
// debugger;
        
//       this.patientDataList = data;

//       var i:any=0;   
//       for( i=0;i<this.patientDataList.Vitals.length;i++)
//       {
//         if(!this.isEmpty(this.patientDataList.Vitals[i].RecordDate))
//         {
//         this.patientDataList.Vitals[i].DateTime= this.patientDataList.Vitals[i].RecordDate;

//           var a=this.patientDataList.Vitals[i].DateTime;
//           const _time=this.patientDataList.Vitals[i].DateTime.split(' ');
//           const _date = _time[0].split('-');
//           const dateObj = {month: _date[1], day: _date[2], year: _date[0]};
//         //  this.patientDataList.Vitals[i].DateTime=_date[2]+"-"+_date[0]+"-"+  _date[1]+' '+_time[1];
//           this.patientDataList.Vitals[i].DateTime=_date[2]+"-"+_date[0]+"-"+  _date[1];
//         }
//       }


//       for( i=0;i<this.patientDataList.Vitals.length;i++)
//       {
//         if(this.isEmpty(this.patientDataList.Vitals[i].code))
//         {
//           this.patientDataList.Vitals[i].code.text='';
//         }
//         else if(this.isEmpty(this.patientDataList.Vitals[i].code.text) )
//            {
//             !this.isEmpty(this.patientDataList.Vitals[i].code.coding)
//             {
//               this.patientDataList.Vitals[i].code.text=this.patientDataList.Vitals[i].code.coding[0].display;
//             }
    
              
//            }
//           //  this.patientDataList.Vitals[i].Name= this.patientDataList.Vitals[i].code.text;
//           if(this.isEmpty(this.patientDataList.Vitals[i].VitalType))
//           this.patientDataList.Vitals[i].Name= this.patientDataList.Vitals[i].code.text;
//           else
//           this.patientDataList.Vitals[i].Name= this.patientDataList.Vitals[i].VitalType;

//           if(!this.isEmpty(this.patientDataList.Vitals[i].valueQuantity))
//           {
//             if(!(this.patientDataList.Vitals[i].Name === 'BloodPressure' || this.patientDataList.Vitals[i].Name === 'Blood Pressure'))
//             {
//               this.patientDataList.Vitals[i].Value= Math.round(this.patientDataList.Vitals[i].valueQuantity.value);
//             }
//             else
//             {

//               var bp=(this.patientDataList.Vitals[i].valueQuantity.valueString).split('/');
//               if(bp.length >0)
//               {
//                 var a:any=(parseInt(bp[0], 10));
//                 var b:any=( parseInt(bp[1], 10));
//                 this.patientDataList.Vitals[i].Value= a+'/'+b
//               }
//               else
//               this.patientDataList.Vitals[i].Value='';
             
//               // this.patientDataList.Vitals[i].valueQuantity.valueString;

//             }
             
//              this.patientDataList.Vitals[i].Units= this.patientDataList.Vitals[i].valueQuantity.unit;
//          }
//      }


//        this.patientDetails=JSON.parse(JSON.stringify(this.patientDataList.PatientData));
//  //this.patientVitals=JSON.parse(JSON.stringify(this.patientDataList.Vitals));
//  this.HeightList = this.patientDataList.Vitals.filter(vital => {
//             if (vital.Name === 'Height') {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });
        
// //          var date= this.utilsvc.simpledateFormat(new Date(Math.max.apply(null, this.HeightList.map(function(e) {
// //  //alert(e.DateTime);
// //           return new Date(e.DateTime);
// // }))) );
// var date=this.HeightList.map(function(e) { return e.DateTime; }).sort().reverse()[0]

//        this.lastHeight=this.HeightList.filter(height => {
//             // if (this.utilsvc.simpledateFormat(height.DateTime) === date ) {
//        if ((height.DateTime) === date ) {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });

//         this.WeightList = this.patientDataList.Vitals.filter(vital => {
//             if (vital.Name === 'Patient Body Weight - Measured' || vital.Name === 'Weight') {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });
//         debugger;
// // var date= this.utilsvc.simpledateFormat(new Date(Math.max.apply(null, this.WeightList.map(function(e) {
// //   return new Date(e.DateTime);
// // }))) );
// var date=this.WeightList.map(function(e) { return e.DateTime; }).sort().reverse()[0]

//        this.lastWeight=this.WeightList.filter(weight => {
//             if ((weight.DateTime) === date ) {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });
//         this.TempratureList = this.patientDataList.Vitals.filter(vital => {
//             if (vital.Name === 'Temperature') {
             
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });
// // var date= this.utilsvc.simpledateFormat(new Date(Math.max.apply(null, this.TempratureList.map(function(e) {
// //   return new Date(e.DateTime);
// // }))) );

// var date=this.TempratureList.map(function(e) { return e.DateTime; }).sort().reverse()[0]



//        this.lastTemp=this.TempratureList.filter(temp => {

        

//         debugger;
//             // if (this.utilsvc.simpledateFormat(temp.DateTime) === date ) {
//               if (temp.DateTime === date ) {
//               this.temp1=temp.Value;
//               this.temp2=temp.Units;
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });

//         this.BMIList = this.patientDataList.Vitals.filter(vital => {
//             if (vital.Name === 'BMI' || vital.Name === 'BMI-body mass index') {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });
// // var date= this.utilsvc.simpledateFormat(new Date(Math.max.apply(null, this.BMIList.map(function(e) {
// //   return new Date(e.DateTime);
// // }))) );
// var date=this.BMIList.map(function(e) { return e.DateTime; }).sort().reverse()[0]

//        this.lastBMI=this.BMIList.filter(BMI => {
//             if ((BMI.DateTime) === date ) {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });
//         this.RespirationRateList = this.patientDataList.Vitals.filter(vital => {
//             if (vital.Name === 'RespirationRate' || vital.Name === 'Respiratory Rate') {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });

// // var date= this.utilsvc.simpledateFormat(new Date(Math.max.apply(null, this.RespirationRateList.map(function(e) {
// //   return new Date(e.DateTime);
// // }))) );
// var date=this.RespirationRateList.map(function(e) { return e.DateTime; }).sort().reverse()[0]

//        this.lastRespiration=this.RespirationRateList.filter(res => {
//             if ((res.DateTime) === date ) {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });


//         this.Heart_RateList = this.patientDataList.Vitals.filter(vital => {
//             if (vital.Name === 'Heart Rate' || vital.Name === 'HeartRate'|| vital.Name === 'Pulse') {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });

// // var date= this.utilsvc.simpledateFormat(new Date(Math.max.apply(null, this.Heart_RateList .map(function(e) {
// //   return new Date(e.DateTime);
// // }))) );
// var date=this.Heart_RateList.map(function(e) { return e.DateTime; }).sort().reverse()[0]

//        this.lastHeart=this.Heart_RateList .filter(heart => {
//             if ((heart.DateTime) === date ) {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });
//         this.Intravascular_SystolicList = this.patientDataList.Vitals.filter(vital => {
//             if (vital.Name === 'Intravascular Systolic' ||vital.Name === 'BloodPressure') {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });

// // var date= this.utilsvc.simpledateFormat(new Date(Math.max.apply(null, this.Intravascular_SystolicList .map(function(e) {
// //   return new Date(e.DateTime);
// // }))) );
// var date=this.Intravascular_SystolicList.map(function(e) { return e.DateTime; }).sort().reverse()[0]

//        this.lastSystolic=this.Intravascular_SystolicList.filter(sys => {
//             if ((sys.DateTime) === date ) {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });

//         this.Intravascular_DiastolicList = this.patientDataList.Vitals.filter(vital => {
//             if (vital.Name === 'Intravascular Diastolic') {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });
// //  var date= this.utilsvc.simpledateFormat(new Date(Math.max.apply(null, this.Intravascular_DiastolicList .map(function(e) {
// //   return new Date(e.DateTime);
// // }))) );
// var date=this.Intravascular_DiastolicList.map(function(e) { return e.DateTime; }).sort().reverse()[0]

//        this.lastDiastolic=this.Intravascular_DiastolicList.filter(diasys => {
//             if ((diasys.DateTime) === date ) {
//                 return true;
//             }
//             else {
//                 return false;
//             };
//         });
       
//        debugger;

//        /*console.log(this.lastHeight[0].Value);
//        console.log(this.lastDiastolic.Value);
//        console.log(this.lastSystolic[0].Value);
//        console.log(this.lastTemp[0].Value);
//        console.log(this.lastWeight[0].Value);
//        console.log(this.lastBMI[0].Value);
//        console.log(this.lastHeart[0].Value);*/
//        function isEmpty(val){
//         return (val === undefined || val == null || val.length <= 0) ? true : false;
//     } 
//  this.vitals = [
//     {
//       icon: "fas fa-thermometer",
//       name: "Temperature",
//       // value: this.temp1,
//       // unit: this.temp2
//       value: this.lastTemp[0]!==undefined? this.lastTemp[0].Value : "---",
//       unit: this.lastTemp[0]!==undefined? this.lastTemp[0].Units : ""
      
//     }
//     ,
//     {
//       icon: "fas fa-ruler",
//       name: "Height",
//       //this.lastHeight[0]!==undefined? this.lastHeight[0].Value : "Not Found",
//       value: this.lastHeight[0]!==undefined? this.lastHeight[0].Value : "---",
//       unit: this.lastHeight[0]!==undefined? this.lastHeight[0].Units : ""
//     },
//     {
//       icon: "fas fa-weight",
//       name: "Body Weight",
//       value: this.lastWeight[0]!==undefined? this.lastWeight[0].Value : "---",
//       unit: this.lastWeight[0]!==undefined? this.lastWeight[0].Units : ""
//     },
//     {
//       icon: "fas fa-weight-hanging",
//       name: "BMI",
//       value: this.lastBMI[0]!==undefined? this.lastBMI[0].Value : "---",
//       unit: this.lastBMI[0]!==undefined? this.lastBMI[0].Units : ""
//     },
//     {
//       icon: "fas fa-heartbeat",
//       name: "Blood pressure",
//       value: this.lastSystolic[0]!==undefined? this.lastSystolic[0].Value : "---",
//       unit: this.lastSystolic[0]!==undefined? this.lastSystolic[0].Units : ""
//     },
//     {
//       icon: "fab fa-gratipay",
//       name: "Heart Rate",
//       value: this.lastHeart[0]!==undefined? this.lastHeart[0].Value : "---",
//       unit: this.lastHeart[0]!==undefined? this.lastHeart[0].Units : ""
//     }
//     /*,
//     {
//       icon: "fas fa-atom",
//       name: "Respiratory Rate",
//       value: this.lastRespiration[0].Value,
//       unit: "/min"
//     },*/
//   ]
//  },
//     (err : HttpErrorResponse)=>{
//       this.auth.logout();
      
//       //this.router.navigate(['dashboard']);
//     }
//  );
    
//   }

closeNav(snav){
  snav.toggle();
}
}
