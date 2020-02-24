import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  editBody=
  {
 // "organizationId":0,
  "city":"",
  "zip":"",
  "address":"",
  "email":"",
  "clientName":"",
  "description":"",
  "state":"",
  "status":false
  
};


edit_c_id;
  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }

  ngOnInit() {
    this.edit_c_id=localStorage.getItem("edit-client-id");
   
    this.rest.client_findById(this.edit_c_id).subscribe((data:any) => {

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
    this.rest.client_update(this.edit_c_id,this.editBody).subscribe((data:any) => {
      if(data.responseCode=="00")
      {
        this.toastr.success('', 'Updated!');
        this.router.navigate(['dashboard/client/']);
      }
    }
    ,
    (err : HttpErrorResponse)=>{      
      this.toastr.error('', 'Failed!');
      }
    );
  }


 
}
