import { RestService } from 'src/app/Components/services/rest/rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, Input } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
//import { PdfViewerModule } from "ng2-pdf-viewer";
@Component({
  selector: 'app-multisheet-excel-template',
  templateUrl: './multisheet-excel-template.component.html',
  styleUrls: ['./multisheet-excel-template.component.scss']
  
})
export class MultisheetExcelTemplateComponent implements OnInit {
 pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  //pdfSrc ="https://www.google.com/search?q=image+paths&rlz=1C1CHBF_enPK821PK821&sxsrf=ACYBGNT3rzthnigBTJO1d-GpjWTm5di9BQ:1581504055220&tbm=isch&source=iu&ictx=1&fir=9Qy98c-YeNP-tM%253A%252CecodQgaRhEjnUM%252C_&vet=1&usg=AI4_-kRJdbi5NQyLJWgaCbdJgb48pywLdg&sa=X&ved=2ahUKEwjWhLDb6cvnAhUPWsAKHf40AFUQ9QEwAHoECAoQKQ#imgrc=_wFcSc4UVsM6nM";
  show: Boolean = false;
  showPDF: Boolean = false;
  NoOfSheets;
  isActive;
  isActive1;
  i: any;
  option;
  size;
  multisheet;
  uploadForm: FormGroup;
  editField;
  mainFile;
  format;
  type;
  descmain;
  attribute1;
  attribute2;
  attribute3;
  file_name;
  audit_session_id;
  newAttribute = {
    "sheetNo": "",
    "headerRow": ""
  };
  fieldArray = [];
  new_filename: any;
  new_mainFile: any;
  new_type: any;
  new_format: any;
  new_descmain: any;
  uploadedFile: any;
  FileTypeList: any;
  client: number;
  sheetsList: any;
   formData = new FormData();
  sheetHeaderList: any;
  fileFormat: any;
  showPopup=false;
  //public PdfViewerModule:PdfViewerModule,
  constructor(public dialog: MatDialog, public toastr: ToastrService, public rest: RestService, public router: Router, public http: HttpClient, public formBuilder: FormBuilder, public formsModule: FormsModule, public reactiveFormsModule: ReactiveFormsModule) {

  }

  ngOnInit() {
    
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

  onChange(value) {
    this.format = this.FileTypeList.filter((items) => items.name === value)[0];
//alert(this.format.name);
this.fileFormat=this.format.name;
  }  // readHeaders(){


  //   const reader: FileReader = new FileReader();


  //       reader.readAsText(this.uploadForm.get('mainFile').value);
  //       reader.onload = (e) => {
  //           const res = reader.result as string; // This variable contains your file as text
  //           const lines = res.split('\n'); // Splits you file into lines
  //           const ids = [];
  //           lines.forEach((line) => {
  //               ids.push(line.split(',')[0]); // Get first item of line
  //           });
  //           console.log(ids);
  //       };

  // }
  onFileSelect(event) {
    debugger;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //console.log(file);
      this.uploadedFile = file;
      //this.pdfSrc=event.target.value;
      this.uploadForm.get('mainFile').setValue(file);
    }
  }
  checkValue(event, id) {
    // alert(event.target.checked);
    // alert(++id);
    var sheet=++id;
    if(event.target.checked===true)
    this.formData.append('sheetNo', sheet.toString() );
  }
  setHeaderRow(event, id) {
    debugger;
    // alert(event.target.value);
    // alert(id);
    this.formData.append('headerRow', event.target.value );
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  onSubmit() {
    
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
      && !this.isEmpty(this.new_descmain)
    ) {
      if(this.fileFormat==="PDF")
    {
      this.showPDF = true;
 
    }
    if(this.fileFormat==="Excel"){
      
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
      this.formData.append('fileTypeId', this.format.id);
      this.formData.append('description', this.uploadForm.get('descmain').value);
      this.formData.append('clientId', "1");
      formDataCall1.append('file', this.uploadForm.get('mainFile').value);

      console.log(this.formData);
      console.log(formDataCall1);
      // alert(this.uploadForm.get('mainFile').value);
      // alert(formDataCall1.get('file'));


      this.rest.getSheetNames(formDataCall1).subscribe((data: any) => {
        debugger;
        //      alert(JSON.stringify(data));
        if (data.responseCode === "00") {

          console.log(data);
          if(this.fileFormat==="Excel")
          this.show = true;
         
          this.NoOfSheets = data.sheetNames.length;
          this.sheetsList = data.sheetNames;
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
  }
    else {
      this.toastr.error('', 'Enter all required fields!');
    }
  }
  // changeValue(id: number, property: string, event: any) {
  //   debugger;
  //   this.editField = event.target.textContent;
  //   if (property === "desc")
  //     this.newAttribute.desc = this.editField;

  // }
  // changeValue1(id: number, property: string, event: any) {
  //   debugger;
  //   this.editField = event.target.textContent;

  // }
  // updateList(controlId: any, id: number, property: string, event: any) {
  //   if (confirm("Are you sure to edit the record?")) {
  //     debugger;
  //     const editField = event.target.textContent;
  //     var selectField = event.target.value;
  //     const checkField = event.target.checked;
  //     this.fieldArray[id][property] = editField;

  //     //this.updateBody.id=controlId;

  //   }
  // }

  // addFieldValue() {

  //   debugger;
  //   if (!this.isEmpty(this.newAttribute.file) && !this.isEmpty(this.newAttribute.desc)) {
  //     console.log(this.newAttribute);
  //     this.fieldArray.push(this.newAttribute);

  //     console.log(this.fieldArray);
  //     this.newAttribute = {
  //       "file": "",
  //       "desc": "",
  //     };
  //     console.log(this.newAttribute);
  //   }
  //   else {
  //     this.toastr.error('', 'You need to add supporting file details first!');
  //   }
  // }
  // onFileSelect1(event) {
  //   if (event.target.files.length > 0) {
  //     debugger;
  //     const file = event.target.files[0];
  //     this.uploadForm.get('file').setValue(file);
  //     this.newAttribute.file = file;
  //   }
  // }
  saveData() {
    this.rest.addMultiSheets(this.formData).subscribe((data: any) => {
      debugger;
      //      alert(JSON.stringify(data));
      
      if (data.responseCode === "00") {
        this.showPopup=true;
        console.log(data);
        this.sheetHeaderList=data.sheetHeaderList;
       // this.openDialog();
        // this.NoOfSheets = data.sheetNames.length;
        // this.sheetsList = data.sheetNames;
        
      }
      if (data.responseCode === "01") {
        this.showPopup=false;
        this.toastr.error('Error', 'Duplicate File cannot be uploaded!');
        
      }


    });
    
  }
  saveDataPDF(){
    //alert("inside pdf button event call");
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
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogShowHeaders, {
      width: '700px',
      data: this.sheetHeaderList
    });


  }
  onNoClick(): void {
   // this.dialogRef.close();
    //this.auth.logout();
  }
  
  onYesClick(): void {
    this.toastr.success('', 'Sheets Uploaded Successfully!');
   // this.dialogRef.close();
    location.reload();
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'

})
export class DialogShowHeaders {
  sheetHeaderList: any;


  constructor(
    private router: Router,
    public http: HttpClient, public toastr: ToastrService,

    public rest: RestService,
    public dialogRef: MatDialogRef<DialogShowHeaders>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.sheetHeaderList=data;
    console.log(this.sheetHeaderList);
  }

  onNoClick(): void {
    this.dialogRef.close();
    //this.auth.logout();
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  onYesClick(): void {
    this.toastr.success('', 'Sheets Uploaded Successfully!');
    this.dialogRef.close();
    location.reload();
  }

}
