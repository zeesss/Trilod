import { Observable } from 'rxjs';
import { ConfirmationService } from './../confirmation/confirmation.service';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { AuthService } from 'src/app/Components/services/auth/auth.service';

import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NgbModal, ModalDismissReasons,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { resolve } from 'url';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
//import * as $ from 'jquery';
@Component({
  selector: 'app-work-paper',
  templateUrl: './work-paper.component.html',
  styleUrls: ['./work-paper.component.scss']
})
export class WorkPaperComponent implements OnInit {
  personList;
  session: {};
  br:any;
  businessRule:any;
  CompanyList: {};
  company: any;
  auditList: {};
  audit: any;
  getTable: Boolean=false;
  getDetails: Boolean=false;
  constructor(public rest:RestService,public toastr:ToastrService) { }

  ngOnInit() {
    this.rest.getCompanyList().subscribe((data: {}) => {

      this.CompanyList = data;
      console.log(data);
    });
// this.rest.getWorkPaperTemplateById(localStorage.getItem("editSessionId")).subscribe((data: {}) => {
  
//         this.personList=data;
// }
//       );
//       this.rest.getWorkPaperTemplateBySessionId(localStorage.getItem("editSessionId")).subscribe((data: {}) => {
       
//               console.log(data);
//               this.businessRule=data;
//       }
//             );
//       this.rest.findSession(localStorage.getItem("editSessionId")).subscribe((data: {}) => {
        
//               this.session=data;
//       }
//             );
  }
  onChange(event) {
    console.log(this.company);
    this.rest.findSessionByClientCompleted(this.company).subscribe((data: {}) => {
      console.log(data);
      this.auditList = data;

    });
  }
  onChangeAudit(event) {
    this.getDetails=true;
          this.rest.findSession(this.audit).subscribe((data: {}) => {
            console.log(data);
              this.session=data;
      }
            );
    console.log(this.audit);
          this.rest.getWorkPaperTemplateBySessionId(this.audit).subscribe((data: {}) => {
       
              console.log(data);
              this.businessRule=data;
      }
            );

  }
  
  export(){
  
// debugger;
// const pdf = new jspdf('p', 'mm');
//         const promises = $('#myDiv').map(function(index, element) {
//             return new Promise(function(resolve, reject) {
//                 html2canvas(element, { allowTaint: true, logging: true })
//                     .then(function(canvas) {
//                         resolve(canvas.toDataURL('image/jpeg', 1.0));
//                     })
//                     .catch(function(error) {
//                         reject('error in PDF page: ' + index);
//                     });
//             });
//         });

//         Promise.all(promises).then(function(dataURLS) {
//             console.log(dataURLS);
//             for (const ind in dataURLS) {
//                 if (dataURLS.hasOwnProperty(ind)) {
//                     console.log(ind);
//                     pdf.addImage(
//                         dataURLS[ind],
//                         'JPEG',
//                         0,
//                         0,
//                         pdf.internal.pageSize.getWidth(),
//                         pdf.internal.pageSize.getHeight(),
//                     );
//                     pdf.addPage();
//                 }
//             }
//             pdf.save('HTML-Document.pdf');
//         });
var data = document.getElementById('myDiv');
console.log(data);
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 208;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL('image/JPEG');
let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight);
pdf.text("", 15,15);
pdf.save('MYPdf.pdf'); // Generated PDF
});

//  let data = document.getElementById('myDiv');  
//         html2canvas(data).then(canvas => {
//           const contentDataURL = canvas.toDataURL('image/png')  
//           //let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
//            let pdf = new jspdf('p', 'cm', 'a4'); // Generates PDF in portrait mode
//           pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
//           pdf.save('Filename.pdf');   
//         });
}
   
  
  changeRule(event: any){
    debugger;
    var selectField = event.target.value;
    //alert(selectField);
    selectField=selectField.split(":")[0];
    //alert(selectField);
    //var br=this.businessRule.filter((items) => items.name === selectField)[0];
    //alert(br.id);
   
    //this.rest.getWorkPaperTemplateFindById(br.id).subscribe((data: {}) => {
      this.rest.getWorkPaperTemplateFindById(selectField).subscribe((data: {}) => {
      // debugger;
        //      alert(JSON.stringify(data));
        this.getTable=true;
       
            console.log(data);
            this.personList=data;
    }
          );
  }

}
