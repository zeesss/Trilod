import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {UtilsService} from '../../services/utils/utils.service';
import { RestService } from '../../services/rest/rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-dash-tabs',
  templateUrl: './dash-tabs.component.html',
  styleUrls: ['./dash-tabs.component.scss']
})
export class DashTabsComponent implements OnInit {
hideElement: Boolean;
    DOB:any;
  FirstName:any;
  LastName:any;
  MRN:any;
  Gender:any;
  Mobile="";
  Email:any;
  name='';
  mrn='';
  phone='';
  hideElement_search=false;
  patientDetails_all: any = {};
 public patientDetails:any;
  PatientId:any;
test: any = {};
  patientobject: any = {};
  user:any;
    patientDataList:any = [];
    pattern="^\\+?[1-9]\\d{1,14}$";
    patient:any;
    pageIndex:any;
    totalPages:any;
  constructor(public auth:AuthService,public rest:RestService,private router:Router,public utilsvc: UtilsService,public toastr: ToastrService) {
  }

  ngOnInit() {

this.pageIndex=0;
      this.user= localStorage.getItem('firstName')+" "+localStorage.getItem('lastName');
    //  alert("----");

     this.hideElement=false;

    //  if(this.rest.getSearchPatient()){

    //      this.patient=this.rest.getSearchPatient();
    //
    //      //console.log(this.rest.getSearchPatient());
    //     /* this.DOB=this.patient.DOB;
    //      this.FirstName=this.patient.FirstName;
    //      this.LastName=this.patient.LastName;
    //      this.Gender=this.patient.Gender;
    //      this.MRN=this.patient.MRN;
    //      this.Mobile=this.patient.MobileNo;
    //      this.Email=this.patient.Email;*/
    //      //this.search();
    //      //this.search(this.patient);

    //  }
    //  else{
    //    this.getPatients();
    //  }
    //  if(this.pageIndex==0){
    //   document.getElementById("previous").classList.add("disabled");
    //   }

  }
next(){
  document.getElementById("first").classList.remove("disabled");
  document.getElementById("previous").classList.remove("disabled");
  //this.pageIndex++;
  if(this.pageIndex==this.totalPages-1){
    this.patientDataList = [];
//     this.rest.getPatients(this.pageIndex).subscribe((data: {}) => {
// //
//   //      alert(JSON.stringify(data));
//       this.patientDataList = data;
//       this.patientDetails=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       this.patientDetails_all=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       localStorage.removeItem('patientDetails');
//       localStorage.setItem('patientDetails',JSON.stringify(this.patientDetails,null, '\t'));
//       console.log(this.patientDataList);

//     }
//     ,
//     (err : HttpErrorResponse)=>{
//       this.auth.logout();
//     });
  }
  else{
    this.pageIndex++;
  this.patientDataList = [];
//     this.rest.getPatients(this.pageIndex).subscribe((data: {}) => {
// //
//   //      alert(JSON.stringify(data));
//       this.patientDataList = data;
//       this.patientDetails=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       this.patientDetails_all=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       localStorage.removeItem('patientDetails');
//       localStorage.setItem('patientDetails',JSON.stringify(this.patientDetails,null, '\t'));
//       console.log(this.patientDataList);
//       if(this.pageIndex==this.totalPages-1){
//         document.getElementById("first").classList.remove("disabled");
//         document.getElementById("next").classList.add("disabled");
//         document.getElementById("previous").classList.remove("disabled");
//       document.getElementById("last").classList.add("disabled");
//       }
//     }
//     ,
//     (err : HttpErrorResponse)=>{
//       this.auth.logout();
//     });
  }

}
previous(){

  document.getElementById("next").classList.remove("disabled");
  document.getElementById("last").classList.remove("disabled");
  //alert(this.pageIndex);
    // if(this.pageIndex===0){
    //   document.getElementById("previous").classList.add("disabled");
    //   }
  if(this.pageIndex==0)
  {

    //document.getElementById("previous").classList.add("disabled");

    this.patientDataList = [];
//     this.rest.getPatients(this.pageIndex).subscribe((data: {}) => {
// //
//   //      alert(JSON.stringify(data));
//       this.patientDataList = data;
//       this.patientDetails=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       this.patientDetails_all=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       localStorage.removeItem('patientDetails');
//       localStorage.setItem('patientDetails',JSON.stringify(this.patientDetails,null, '\t'));
//       console.log(this.patientDataList);
//     }
//     ,
//     (err : HttpErrorResponse)=>{
//       this.auth.logout();
//     });

  }
  else{
  this.pageIndex--;

  this.patientDataList = [];
//     this.rest.getPatients(this.pageIndex).subscribe((data: {}) => {
// //
//   //      alert(JSON.stringify(data));
//       this.patientDataList = data;
//       this.patientDetails=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       this.patientDetails_all=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       localStorage.removeItem('patientDetails');
//       localStorage.setItem('patientDetails',JSON.stringify(this.patientDetails,null, '\t'));
//       console.log(this.patientDataList);
//       if(this.pageIndex==0)
//       {
//       document.getElementById("previous").classList.add("disabled");
//       document.getElementById("first").classList.add("disabled");
//       document.getElementById("next").classList.remove("disabled");
//       document.getElementById("last").classList.remove("disabled");
//     }
//     }
//     ,
//     (err : HttpErrorResponse)=>{
//       this.auth.logout();
//     });
  }
}
first(){
  document.getElementById("first").classList.add("disabled");
  document.getElementById("next").classList.remove("disabled");
  document.getElementById("last").classList.remove("disabled");
  document.getElementById("previous").classList.add("disabled");
this.ngOnInit();
}
last(){
  document.getElementById("last").classList.add("disabled");
  document.getElementById("previous").classList.remove("disabled");
  document.getElementById("first").classList.remove("disabled");
  document.getElementById("next").classList.add("disabled");
  this.pageIndex=this.totalPages-1;
  this.patientDataList = [];
//     this.rest.getPatients(this.pageIndex).subscribe((data: {}) => {
// //
//   //      alert(JSON.stringify(data));
//       this.patientDataList = data;
//       this.patientDetails=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       this.patientDetails_all=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       localStorage.removeItem('patientDetails');
//       localStorage.setItem('patientDetails',JSON.stringify(this.patientDetails,null, '\t'));
//       console.log(this.patientDataList);
//     }
//     ,
//     (err : HttpErrorResponse)=>{
//       this.auth.logout();
//     });

}


  getPatients() {
     // alert("2");

    this.patientDataList = [];
//     this.rest.getPatients(this.pageIndex).subscribe((data: {}) => {
// //
//   //      alert(JSON.stringify(data));
//       this.patientDataList = data;
//       this.patientDetails=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       this.patientDetails_all=JSON.parse(JSON.stringify(this.patientDataList.Data));
//       localStorage.removeItem('patientDetails');
//       localStorage.setItem('patientDetails',JSON.stringify(this.patientDetails,null, '\t'));
//       console.log(this.patientDataList);
//       this.totalPages=Math.ceil(JSON.parse(JSON.stringify(this.patientDataList.TotalNoOfRecords))/20);
//       console.log(this.totalPages);
//     }
//     ,
//     (err : HttpErrorResponse)=>{
//       this.auth.logout();
//     });
  }

  get patientDetailsData(): any {
    //alert("Observing");
   this.patientDetails=JSON.parse(localStorage.getItem('patientDetails'));
    return JSON.parse(localStorage.getItem('patientDetails'));
}


//   onViewPatientDetailsClicked(Id:String){

//       var element = document.getElementById("home");
//       element.classList.remove("active");
// this.rest.setPatient(Id);
//     this.router.navigate(['dashboard/patient-dashboard']);
//   }
  clearSearch(){
this.hideElement= false;
this.hideElement_search=false;
this.DOB="";
this.FirstName="";
this.LastName="";
this.MRN="";
this.Gender="";
this.Mobile="";
this.Email="";
       this.getPatients();

  }

  clearSearch_new(){
    document.getElementById("next").classList.remove("disabled");
    document.getElementById("last").classList.remove("disabled");

    this.hideElement= false;
    this.hideElement_search=false;
    this.name='';
    this.mrn='';
    this.phone='';
    //this.patientDetails=this.patientDetails_all;
    //this.pageIndex=0;
    this.ngOnInit();
      }

  nextSearch() {
    this.hideElement_search=true;

    //this.patientDetails=[];
    this.patientDetails = this.patientDetails.filter(pd => {

        if (((pd.FirstName.toLowerCase()).includes(this.name.toLowerCase()) || (pd.LastName.toLowerCase()).includes(this.name.toLowerCase()))
           && ((pd.MRN.toLowerCase()).includes(this.mrn.toLowerCase()) ))
         {
          if(this.phone.length >0)
          {
            if((pd.PhoneNumbers.Mobile).includes(this.phone))
            return true;
            else
            return false;
          }
          else
          return true;
           // return true;
        }
        else {
            return false;
        };
    });

    // const regExp = new RegExp(keyword,"gi");
    // const check = obj => {
    //   if (obj !== null && typeof obj === "object") { return Object.values(obj).some(check) }
    //   if (Array.isArray(obj)) { return obj.some(check) }
    //   return (typeof obj === "string") && regExp.test(obj);
    // }
    // return array.filter(check);
  }
  search() {
      //this.patientobject=patient;



      this.hideElement_search=true;

      this.hideElement= true;

      // this.test.DOB= this.patientobject.DOB;
      // if(this.test.DOB==null || this.test.DOB==undefined)
      // {this.test.DOB="";}
      // else{
      //     this.test.DOB=this.utilsvc.simpledateFormat(this.DOB);
      // }
      // this.test.MRN= this.patientobject.MRN;
      // if(this.test.MRN==null || this.test.MRN==undefined)
      // {this.test.MRN="";}
      // this.test.FirstName= this.patientobject.FirstName;
      // if(this.test.FirstName==null || this.test.FirstName==undefined)
      // {this.test.FirstName="";}
      // this.test.LastName= this.patientobject.LastName;
      // if(this.test.LastName==null || this.test.LastName==undefined)
      // {this.test.LastName="";}
      // this.test.Gender= this.patientobject.Gender;
      // if(this.test.Gender==null || this.test.Gender==undefined)
      // {this.test.Gender="";}
      // this.test.MobileNo= this.patientobject.Mobile;
      // if(this.test.MobileNo==null || this.test.MobileNo==undefined)
      // {this.test.MobileNo="";}
      // this.test.Email= this.patientobject.Email;
      // if(this.test.Email==null || this.test.Email==undefined)
      // {this.test.Email="";}
      this.test.FirstName=this.name;
      this.test.MobileNo=this.phone;
      this.test.MRN=this.mrn;
      this.patientDataList = [];

      // alert();
    // this.rest.getPatientsFilter(this.test).subscribe((data: {}) => {


    //   this.patientDataList = data;
    //   this.patientDetails=JSON.parse(JSON.stringify(this.patientDataList.Data));
    //   this.patientDetails_all=JSON.parse(JSON.stringify(this.patientDataList.Data));
    //   localStorage.removeItem('patientDetails');
    //   localStorage.setItem('patientDetails',JSON.stringify(this.patientDetails,null, '\t'));
    //   console.log(this.patientDetails);
    //   this.pageIndex=0;
    //   document.getElementById("previous").classList.add("disabled");
    //   document.getElementById("first").classList.add("disabled");

    // });


  }
  /*search() {

      if(!(this.Mobile.match(this.pattern))&& this.Mobile!=="")
      {
      this.toastr.error('Please match requested format +442071838750', 'Failed!');

      }
      else{
      this.hideElement= true;

      this.test.DOB=this.DOB;
      if(this.test.DOB==null || this.test.DOB==undefined)
      {this.test.DOB="";}
      else{
          this.test.DOB=this.utilsvc.simpledateFormat(this.DOB);
      }
      this.test.MRN=this.MRN;
      if(this.test.MRN==null || this.test.MRN==undefined)
      {this.test.MRN="";}
      this.test.FirstName=this.FirstName;
      if(this.test.FirstName==null || this.test.FirstName==undefined)
      {this.test.FirstName="";}
      this.test.LastName=this.LastName;
      if(this.test.LastName==null || this.test.LastName==undefined)
      {this.test.LastName="";}
      this.test.Gender=this.Gender;
      if(this.test.Gender==null || this.test.Gender==undefined)
      {this.test.Gender="";}
      this.test.MobileNo=this.Mobile;
      if(this.test.MobileNo==null || this.test.MobileNo==undefined)
      {this.test.MobileNo="";}
      this.test.Email=this.Email;
      if(this.test.Email==null || this.test.Email==undefined)
      {this.test.Email="";}
      this.patientDataList = [];
    this.rest.getPatientsFilter(this.test).subscribe((data: {}) => {


      this.patientDataList = data;
      this.patientDetails=JSON.parse(JSON.stringify(this.patientDataList.Data));
      console.log(this.patientDetails);
    });
      }

  }*/

 /* search() {

    this.patientDetails = this.patientDataList.Data.filter((allergy) => {
      let s = new Date(this.DOB).getTime();
      const r = new Date(allergy.DOB).getTime();
      //s = s || new Date('1/1/1900').getTime();
      //s = s || new Date().getTime();
      //s=s||"";
      const searchFirstName =  this.FirstName||"";
      const searchMRN =  this.MRN;
     //searchFirstName=searchFirstName||"";
      if (s && searchFirstName && searchMRN) {
        if (r==s) {
          const keys = Object.keys(allergy);
          for (let i = 0; i < keys.length; i++) {
            let val = allergy[keys[i]];
            if (typeof val == 'string') {
              if (val.toLowerCase().includes(searchFirstName.toLowerCase())) {
                return true;
              }
            } else if (Array.isArray(val)) {
              if (val.length > 0) {
                let subKeys = Object.keys(val[0]);
                for (let m = 0; m < val.length; m++) {
                  for (let j = 0; j < subKeys.length; j++) {
                    let subVal = val[m][subKeys[j]];
                    if (subVal.toLowerCase().includes(searchFirstName.toLowerCase())) {
                      return true;
                    }
                  }
                }
              }
              return false;
            }
          }
          return false;
        } else {
          return false;
        }

      } else if (s ) {
        if (s==r) {
          return true;
        }
        else{
          return false;
        }
      }
    });
  } */


  /* patientDataList =
    [
      {
        "id": "4342010",
        "mrn": "10002702",
        "active": true,
        "gender": "male",
        "address": [
          {
            "city": "Overland Park",
            "line": [
              "1234 Blvd"
            ],
            "state": "KS",
            "country": "USA",
            "district": "Johnson",
            "postalCode": "66213",
            "fullAddress": "1234 Blvd\nOverland Park, KS 66213\nUSA"
          }
        ],
        "contact": [
          {
            "gender": "female",
            "address": {
              "line": [

              ]
            },
            "telecom": [
              {
                "use": "home",
                "value": "kathy.pickering@cerner.com",
                "system": "email"
              }
            ],
            "fullName": "SMART, NANCY",
            "relationship": "Authorized Representative",
            "careProviderType": "Contact"
          }
        ],
        "fullUrl": "https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/4342010",
        "telecom": [
          {
            "use": "home",
            "value": "9139898765",
            "system": "phone"
          },
          {
            "use": "mobile",
            "value": "9137876555",
            "system": "phone"
          },
          {
            "use": "home",
            "value": "kathy.pickering@cerner.com",
            "system": "email"
          }
        ],
        "fullName": "SMART, JOE",
        "birthDate": 199566000000,
        "versionId": "21",
        "lastUpdated": "2018-10-17T15:13:18.000+0000",
        "careProvider": [
          {
            "id": "1912007",
            "fullName": "McCurdy, Michael",
            "careProviderType": "Practitioner"
          }
        ],
        "resourceType": "Patient"
      },
      {
        "id": "4342009",
        "mrn": "10002701",
        "active": true,
        "gender": "female",
        "address": [

        ],
        "contact": [
          {
            "gender": "male",
            "address": {
              "city": "Overland Park",
              "line": [
                "1234 Blvd"
              ],
              "state": "KS",
              "country": "USA",
              "district": "Johnson",
              "postalCode": "66213",
              "fullAddress": "1234 Blvd\nOverland Park, KS 66213\nUSA"
            },
            "telecom": [
              {
                "use": "home",
                "value": "9139898765",
                "system": "phone"
              },
              {
                "use": "mobile",
                "value": "9137876555",
                "system": "phone"
              },
              {
                "use": "home",
                "value": "kathy.pickering@cerner.com",
                "system": "email"
              }
            ],
            "fullName": "SMART, JOE",
            "relationship": "Authorized Representative",
            "careProviderType": "Contact"
          },
          {
            "gender": "male",
            "address": {
              "city": "Overland Park",
              "line": [
                "1234 Blvd"
              ],
              "state": "KS",
              "country": "USA",
              "district": "Johnson",
              "postalCode": "66213",
              "fullAddress": "1234 Blvd\nOverland Park, KS 66213\nUSA"
            },
            "telecom": [
              {
                "use": "home",
                "value": "9139898765",
                "system": "phone"
              },
              {
                "use": "mobile",
                "value": "9137876555",
                "system": "phone"
              },
              {
                "use": "home",
                "value": "kathy.pickering@cerner.com",
                "system": "email"
              }
            ],
            "fullName": "SMART, JOE",
            "relationship": "Authorized Representative",
            "careProviderType": "Contact"
          }
        ],
        "fullUrl": "https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/4342009",
        "telecom": [
          {
            "use": "home",
            "value": "kathy.pickering@cerner.com",
            "system": "email"
          }
        ],
        "fullName": "SMART, NANCY",
        "birthDate": 334782000000,
        "versionId": "42",
        "lastUpdated": "2019-01-08T21:59:01.000+0000",
        "careProvider": [
          {
            "id": "1912007",
            "fullName": "McCurdy, Michael",
            "careProviderType": "Practitioner"
          }
        ],
        "resourceType": "Patient"
      },
      {
        "id": "4342008",
        "mrn": "10000891",
        "active": true,
        "gender": "female",
        "address": [
          {
            "city": "Kansas City",
            "line": [
              "1200 Road"
            ],
            "state": "MO",
            "country": "USA",
            "district": "Jackson",
            "postalCode": "64114",
            "fullAddress": "1200 Road\nKansas City, MO 64114\nUSA"
          }
        ],
        "contact": [
          {
            "address": {
              "line": [

              ]
            },
            "fullName": "Smart, Nancy",
            "relationship": "Authorized Representative",
            "careProviderType": "Contact"
          },
          {
            "gender": "male",
            "address": {
              "city": "Kansas City",
              "line": [
                "1000 Rockhill Rd",
                "Apartment 2"
              ],
              "state": "MO",
              "country": "USA",
              "district": "Jackson",
              "postalCode": "64114",
              "fullAddress": "1000 Rockhill Rd\nApartment 2\nKansas City, MO 64114\nUSA"
            },
            "telecom": [
              {
                "use": "home",
                "value": "8168889999",
                "system": "phone"
              },
              {
                "use": "home",
                "value": "kathy.pickering@cerner.com",
                "system": "email"
              }
            ],
            "fullName": "SMART Jr, FRED RICK",
            "relationship": "Authorized Representative",
            "careProviderType": "Contact"
          }
        ],
        "fullUrl": "https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/4342008",
        "telecom": [
          {
            "use": "work",
            "value": "816-222-2222",
            "system": "phone"
          },
          {
            "use": "home",
            "value": "5034008675",
            "system": "phone"
          },
          {
            "use": "mobile",
            "value": "5034008675",
            "system": "phone"
          },
          {
            "use": "home",
            "value": "wilma_smart@gmail.com",
            "system": "email"
          }
        ],
        "fullName": "SMART, WILMA",
        "birthDate": -719472600000,
        "versionId": "185",
        "lastUpdated": "2019-01-29T22:33:46.000+0000",
        "resourceType": "Patient"
      },
      {
        "id": "4642007",
        "mrn": "10002812",
        "active": true,
        "gender": "female",
        "fullUrl": "https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient/4642007",
        "telecom": [
          {
            "use": "home",
            "value": "kathy.pickering@cerner.com",
            "system": "email"
          }
        ],
        "fullName": "Smart, Connie",
        "birthDate": 93553200000,
        "versionId": "12",
        "lastUpdated": "2018-09-24T20:42:07.000+0000",
        "resourceType": "Patient"
      }
    ]
  ; */
}
