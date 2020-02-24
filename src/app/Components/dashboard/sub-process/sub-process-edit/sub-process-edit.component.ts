import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-process-edit',
  templateUrl: './sub-process-edit.component.html',
  styleUrls: ['./sub-process-edit.component.scss']
})
export class SubProcessEditComponent implements OnInit {
  editBody={
    "processId":0,
    "description":"",
    "name":""
  };
  subprocess_id;
  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }

  ngOnInit() {
    this.subprocess_id=localStorage.getItem("edit-subprocess-id");
   
    this.rest.subProcess_findById(this.subprocess_id).subscribe((data:any) => {

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
   
    this.rest.subProcess_update(this.subprocess_id,this.editBody).subscribe((data:any) => {
      if(data.responseCode=="00")
      {
        this.toastr.success('', 'Updated!');
        this.router.navigate(['dashboard/sub-process/']);
      }
    }
    ,
    (err : HttpErrorResponse)=>{      
      this.toastr.error('', 'Failed!');
      }
    );
  }

}
