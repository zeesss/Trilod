import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare const WebViewer: any;
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})


export class CompanyComponent implements OnInit, AfterViewInit {
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
  constructor(public rest: RestService, public router: Router, public http: HttpClient) {

  }
  ngAfterViewInit(): void {

    WebViewer({
      
      path: '../lib',
      // initialDoc: '../files/webviewer-demo-annotated.pdf'
      initialDoc: '../files/abc.pdf'
      // initialDoc: '../files/1.png'
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
}
