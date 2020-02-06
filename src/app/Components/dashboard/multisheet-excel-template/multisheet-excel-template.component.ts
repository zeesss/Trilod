import { RestService } from 'src/app/Components/services/rest/rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-multisheet-excel-template',
  templateUrl: './multisheet-excel-template.component.html',
  styleUrls: ['./multisheet-excel-template.component.scss']
})
export class MultisheetExcelTemplateComponent implements OnInit {
  show:Boolean=false;
  
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
    "desc": "",
    "file": ""
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
  constructor(public dialog:MatDialog,public toastr: ToastrService, public rest: RestService, public router: Router, public http: HttpClient, public formBuilder: FormBuilder, public formsModule: FormsModule, public reactiveFormsModule: ReactiveFormsModule) {

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
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //console.log(file);
      this.uploadedFile = file;

      this.uploadForm.get('mainFile').setValue(file);
    }
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  onSubmit() {
    var client = 14;
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
      const formData = new FormData();
     
       //alert(this.uploadForm.get('sheetNo').value);
      // alert(this.new_mainFile);
      // alert(this.new_format);
      // alert(this.new_descmain);
      // alert(this.uploadForm.get('row').value);
     
      this.client = 14;
      //formData.append('audit_session_id',localStorage.getItem('editSessionId'));
      formData.append('file', this.uploadForm.get('mainFile').value);
      formData.append('name', this.uploadForm.get('file_name').value);
      formData.append('headerRow', this.uploadForm.get('row').value);
      formData.append('sheetNo', this.uploadForm.get('sheetNo').value);
      formData.append('fileTypeId', this.format.id);
      formData.append('description', this.uploadForm.get('descmain').value);
      formData.append('clientId', "14");
      

      console.log(formData);
     this.show=true;

      // this.http.post<any>("http://192.168.52.182:8080/trilod/addfile/add", formData).subscribe(
      //   (res) => console.log(res),

      //   (err) => console.log(err)
      // );
      // {
      //   this.router.navigate(['dashboard/sampleFile']);
      // }

    }
    else {
      this.toastr.error('', 'Enter all required fields!');
    }
  }
  changeValue(id: number, property: string, event: any) {
    debugger;
    this.editField = event.target.textContent;
    if (property === "desc")
      this.newAttribute.desc = this.editField;

  }
  changeValue1(id: number, property: string, event: any) {
    debugger;
    this.editField = event.target.textContent;

  }
  updateList(controlId: any, id: number, property: string, event: any) {
    if (confirm("Are you sure to edit the record?")) {
      debugger;
      const editField = event.target.textContent;
      var selectField = event.target.value;
      const checkField = event.target.checked;
      this.fieldArray[id][property] = editField;

      //this.updateBody.id=controlId;

    }
  }

  addFieldValue() {

    debugger;
    if (!this.isEmpty(this.newAttribute.file) && !this.isEmpty(this.newAttribute.desc)) {
      console.log(this.newAttribute);
      this.fieldArray.push(this.newAttribute);

      console.log(this.fieldArray);
      this.newAttribute = {
        "file": "",
        "desc": "",
      };
      console.log(this.newAttribute);
    }
    else {
      this.toastr.error('', 'You need to add supporting file details first!');
    }
  }
  onFileSelect1(event) {
    if (event.target.files.length > 0) {
      debugger;
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
      this.newAttribute.file = file;
    }
  }
  saveData(){
this.openDialog();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogShowHeaders, {
      width: '600px',
      data: { name:'hi', animal: "hi" }
    });
  
   
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'
 
})
export class DialogShowHeaders {
 
 
  constructor(
    private router: Router,
    public http:HttpClient, public toastr:ToastrService,
   
    public rest:RestService,
    public dialogRef: MatDialogRef<DialogShowHeaders>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  
     }

  onNoClick(): void {
    this.dialogRef.close();
    //this.auth.logout();
  }
  isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
  onYesClick(): void {
    this.toastr.success('', 'Sheets Uploaded Successfully!');
    this.dialogRef.close();
    location.reload();
  }

}
