import { RestService } from 'src/app/Components/services/rest/rest.service';
//import { FormsModule } from '@angular/forms/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-convert-to-excel',
  templateUrl: './convert-to-excel.component.html',
  styleUrls: ['./convert-to-excel.component.scss']
})
export class ConvertToExcelComponent implements OnInit {
  uploadForm: FormGroup;
mainFile;
  new_mainFile: any;
  constructor(public toastr: ToastrService,public rest:RestService,public router:Router,public http:HttpClient,public formBuilder:FormBuilder, public formsModule:FormsModule, public reactiveFormsModule:ReactiveFormsModule) {
  }

  ngOnInit() {
    
    this.uploadForm = this.formBuilder.group({
      mainFile: [''],
     
    });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('mainFile').setValue(file);
    }
  }
  isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
  onSubmit() {
    debugger;
   this.new_mainFile= this.uploadForm.get('mainFile').value;
  
    if(!this.isEmpty(this.new_mainFile)
   
    )
  {

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('mainFile').value);
      
    console.log(formData);
    
    this.rest.convertToExcel(formData).subscribe((data: any) => {
      alert("success");
            console.log(data);
            
           
            
            
          }
          ,
          (err : HttpErrorResponse)=>{
          
         alert(err.error.text);
         var byteCharacters = decodeURIComponent(escape(window.atob(err.error.text)));
        // const byteCharacters = atob(err.error.text);
         const byteNumbers = new Array(byteCharacters.length);
for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
}
const byteArray = new Uint8Array(byteNumbers);
         const blob = new Blob([byteArray], { type : 'application/vnd.ms.excel' });
                const file = new File([blob], 'newExcelFile' + '.xlsx', { type: 'application/vnd.ms.excel' });
                saveAs(file);
         // this.toastr.error('', 'Failed!');
          
          }
          );
    
        }
        else{
          this.toastr.error('', 'Please Attach File!');
        }
  }

}
