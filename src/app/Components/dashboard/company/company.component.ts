import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';

import { RestService } from 'src/app/Components/services/rest/rest.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
declare const WebViewer: any;

import * as $ from 'jquery';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})


export class CompanyComponent implements OnInit, AfterViewInit {
  uploadForm: FormGroup;
  @ViewChild('viewer') viewer: ElementRef;
  wvInstance: any;
  count=0;
  pdfBody={
    "filePath": "test.pdf",
    "clientId":"",
    "description":"",
    "fileTypeId":"2",
    "name":"test",
    "columns": [
      // {
      //   "key": {
      //     "x": "",
      //     "y": "",
      //     "width": "",
      //     "height": ""
      //   },
      //   "value": {
      //     "x": "",
      //     "y": "",
      //     "width": "",
      //     "height": ""
      //   }
      // }
    ]
  }
  obj={
    "key": {
      "x": "",
      "y": "",
      "width": "",
      "height": ""
    },
    "value": {
      "x": "",
      "y": "",
      "width": "",
      "height": ""
    }
  }
  new_filename: any;
  new_mainFile: any;
  new_format: any;
  new_descmain: any;
  fileFormat: string;
  formData = new FormData();
  client: number;
  FileTypeList: any;
  format: any;
  uploadedFile: any;
  path:any;
  pdfSrc: any;
  constructor(public dialog: MatDialog, public toastr: ToastrService, public rest: RestService, public router: Router, public http: HttpClient, public formBuilder: FormBuilder, public formsModule: FormsModule, public reactiveFormsModule: ReactiveFormsModule) {

  }
  ngAfterViewInit(): void {

    WebViewer({
      
      path: '../lib',
      // initialDoc: '../files/webviewer-demo-annotated.pdf'
      initialDoc: '../files/abc.pdf'
      // initialDoc: '../files/1.png'
      //initialDoc:'C:/Users/Zahra-PC/Downloads/MYPdf.pdf' 

    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;
      const annotManager = instance.annotManager;

      instance.openElement('notesPanel');
     

      annotManager.on('annotationChanged', () => {
        // alert('cc');
        const { Annotations } = this.wvInstance;

        const annotations = annotManager.getAnnotationsList();
        const no=annotations.length-1;
        this.count++;
alert(parseInt(annotations[no].getRect().x1)+','+parseInt(annotations[no].getRect().y1)+"  "+
parseInt(annotations[no].getRect().x2)+','+parseInt(annotations[no].getRect().y2)+"\n"+
"Height -"+parseInt(annotations[no].getRect().getHeight())+"\nWidth -"+parseInt(annotations[no].getRect().getWidth())
);
alert(this.count);
if(this.count===1){
this.obj.key.height= parseInt(annotations[no].getRect().getHeight()).toString();
this.obj.key.width=parseInt(annotations[no].getRect().getWidth()).toString();
this.obj.key.x=parseInt(annotations[no].getRect().x1).toString();
this.obj.key.y=parseInt(annotations[no].getRect().y1).toString();
}
if(this.count===2){
this.obj.value.height= parseInt(annotations[no].getRect().getHeight()).toString();
this.obj.value.width=parseInt(annotations[no].getRect().getWidth()).toString();
this.obj.value.x=parseInt(annotations[no].getRect().x1).toString();
this.obj.value.y=parseInt(annotations[no].getRect().y1).toString();
this.pdfBody.columns.push(this.obj);
}
//call here

console.log(this.pdfBody);

this.rest.addPDF(this.pdfBody).subscribe((data: any) => {
  debugger;
  //      alert(JSON.stringify(data));
  console.log(data);
  if (data.responseCode === "00") {
   alert('done');
  }


});

      });

      this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
        // alert(e.detail);
        const [ pageNumber ] = e.detail;

       
        console.log(`Current page is ${pageNumber}`);
      });

      // or from the docViewer instance
      instance.docViewer.on('annotationsLoaded', () => {
        console.log('annotations loaded');
      });

      instance.docViewer.on('documentLoaded', this.wvDocumentLoadedHandler)
    })
  }
  x: number=300;
  y: number;
  w: number=300;
  h: number=300;
 
 

  ngOnInit() {
    // this.x=230;
    this.y=300;

    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
    this.rest.getFileTypeList().subscribe((data: {}) => {
      // debugger;
      //      alert(JSON.stringify(data));
      this.FileTypeList = data;
      console.log(this.FileTypeList);

    });
    //   this.uploadForm = new FormGroup({
    //     mainFile: new FormControl(),
    //     file_name: new FormControl(),
    //     audit_session_id:new FormControl()
    //  });

    this.uploadForm = this.formBuilder.group({
      mainFile: [''],
      //file: [''],
      file_name: new FormControl(),
      //audit_session_id:new FormControl(),
      format: new FormControl(),
      row: new FormControl(),
      sheetNo: new FormControl(),
      descmain: new FormControl()
    });
  }
  
  

  wvDocumentLoadedHandler(): void {

    // alert(this.x+'-'+this.y);
    // you can access docViewer object for low-level APIs
    const docViewer = this.wvInstance;
    const annotManager = this.wvInstance.annotManager;
    // and access classes defined in the WebViewer iframe
    const { Annotations } = this.wvInstance;
    const rectangle = new Annotations.RectangleAnnotation();
    rectangle.PageNumber = 1;
    rectangle.X = this.x;
    rectangle.Y = this.y;
    rectangle.Width = this.w;
    rectangle.Height = this.h;
    rectangle.StrokeThickness = 5;


    // rectangle.Author = annotManager.getCurrentUser();
    // annotManager.addAnnotation(rectangle);
    // annotManager.drawAnnotations(rectangle.PageNumber);


    // alert(rectangle.getRect().x1+','+rectangle.getRect().y1);
    // rectangle.Author = annotManager.getCurrentUser();
    // console.log('annotations loaded');
  // alert(rectangle.X+'--'+rectangle.Y);
    // annotManager.addAnnotation(rectangle);
    // annotManager.addAnnotation(rectangle.X);
    // annotManager.addAnnotation(rectangle.X);
    // annotManager.drawAnnotations(rectangle.PageNumber);
    // see https://www.pdftron.com/api/web/WebViewer.html for the full list of low-level APIs
  }
  onFileSelect(event) {
    
    if (event.target.files.length > 0) {
      //alert("I am here");
      const file = event.target.files[0];
      //console.log(file);
      this.uploadedFile = file;
      this.pdfSrc=event.target.value;
      console.log(event.target.value);
      //alert('hi');
      this.rest.postFile(this.uploadedFile).subscribe(data => {
        // do something, if upload success
        alert('hello');
        }
        // , error => {
        //   console.log(error);
        // }
        );
      this.uploadForm.get('mainFile').setValue(file);
      debugger;
      
     
    }
    
  }
  onChange(value) {
    this.format = this.FileTypeList.filter((items) => items.name === value)[0];
//alert(this.format.name);
this.fileFormat=this.format.name;
  } 
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  onSubmit() {
    $('#loader').addClass('loader');
    //var client = 14;
    debugger;
    this.new_filename = this.uploadForm.get('file_name').value;
    this.new_mainFile = this.uploadForm.get('mainFile').value;
    //this.new_type=this.uploadForm.get('type').value;
    this.new_format = this.uploadForm.get('format').value;
    this.new_descmain = this.uploadForm.get('descmain').value;
    if (!this.isEmpty(this.new_filename)
      && !this.isEmpty(this.new_mainFile)

      && !this.isEmpty(this.new_format)
     
    ) {
      
    
      
      const formDataCall1 = new FormData();
      //alert(this.uploadForm.get('sheetNo').value);
      // alert(this.new_mainFile);
      // alert(this.new_format);
      // alert(this.new_descmain);
      // alert(this.uploadForm.get('row').value);

      this.client = 1;
      //formData.append('audit_session_id',localStorage.getItem('editSessionId'));
      this.formData.append('file', this.uploadForm.get('mainFile').value);
      this.formData.append('name', this.uploadForm.get('file_name').value);
      //this.formData.append('headerRow', this.uploadForm.get('row').value);
     // this.formData.append('sheetNo', this.uploadForm.get('sheetNo').value);
      this.formData.append('fileTypeId', '2');
      this.formData.append('description', this.uploadForm.get('descmain').value);
      this.formData.append('clientId', "1");
      formDataCall1.append('attachment', this.uploadForm.get('mainFile').value);

      console.log(this.formData);
      console.log(formDataCall1);
      // alert(this.uploadForm.get('mainFile').value);
      // alert(formDataCall1.get('file'));


      this.rest.addPDF1(formDataCall1).subscribe((data: any) => {
        debugger;
        //      alert(JSON.stringify(data));
        if (data.responseCode === "00") {
         $('#loader').removeClass('loader');
          console.log(data);
         
          
         
          // this.NoOfSheets = data.sheetNames.length;
          // this.sheetsList = data.sheetNames;
          //alert(this.NoOfSheets);
          //data.data.length;
        }


      });
    

      // this.http.get<any>("http://192.168.52.182:8080/trilod/template/getSheetNames/",formDataCall1).subscribe(
      //   (res) => console.log(res),

      //   (err) => console.log(err)
      // );
      // {
      //   this.router.navigate(['dashboard/sampleFile']);
      // }

    
  }
    else {
      $('#loader').removeClass('loader');
      this.toastr.error('', 'Enter all required fields!');
    }
  }
}
