import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-edit',
  templateUrl: './process-edit.component.html',
  styleUrls: ['./process-edit.component.scss']
})
export class ProcessEditComponent implements OnInit {
  editBody={
    "description":"",
    "name":""
  };
  process_id;
  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }

  ngOnInit() {
    this.process_id=localStorage.getItem("edit-process-id");
   
    this.rest.process_findById(this.process_id).subscribe((data:any) => {

      if(data.responseCode=="00")
      {
   
        this.editBody=data.data[0];
      }
    }
    ,
    (err : HttpErrorResponse)=>{    
      this.toastr.error('', 'Failed!');
      
      }
    );
  }
  onUpdateClick()
  {
    this.rest.process_update(this.process_id,this.editBody).subscribe((data:any) => {
      if(data.responseCode=="00")
      {
        this.toastr.success('', 'Updated!');
        this.router.navigate(['dashboard/process/']);
      }
    }
    ,
    (err : HttpErrorResponse)=>{      
      this.toastr.error('', 'Failed!');
      }
    );
  }

}
