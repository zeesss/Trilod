import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {
  client_name;
  organization;
  email;
  address;
  city;
  state;
  postal_code;
  description;
  saveBody=
    {
    "organizationId":0,
    "city":"",
    "zip":"",
    "address":"",
    "email":"",
    "clientName":"",
    "description":"",
    "state":"",
    "status":false
    
  };
  organizationList:Array<any>;
  orgList;
  orgId;
  status;

  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }

  ngOnInit() {
    this.rest.listOrganization().subscribe((data:any) => {

      if(data.responseCode=="00")
      {
        this.orgList=data.data;
        this.organizationList=this.orgList;
      }
    }
    ,
    (err : HttpErrorResponse)=>{
      this.toastr.error('', 'Failed!');
      }
    );
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  onSaveClick()
  {
    this.organizationList.forEach(element => {
      if(element.name==this.organization)
      {
        this.orgId=element.id;
      }
    });
    if (!this.isEmpty(this.client_name) && !this.isEmpty(this.organization))
    {
      if (this.status == undefined)
      this.saveBody.status = false;
    else
      this.saveBody.status = true;
      this.saveBody.organizationId=this.orgId;
      this.saveBody.state=this.state;
      this.saveBody.zip=this.postal_code;
      this.saveBody.address=this.address;
      this.saveBody.city=this.city;
      this.saveBody.clientName=this.client_name;
      this.saveBody.description=this.description;
      this.saveBody.email=this.email;
      this.rest.client_add(this.saveBody).subscribe((data:any) => {
        if(data.responseCode=="00")
        {
          this.toastr.success("","Data saved!!");
          this.router.navigate(['dashboard/client/']);
        }
      }
      ,
      (err : HttpErrorResponse)=>{     
        this.toastr.error('', 'Failed!');
        }
      );
    }
    else
    {
      this.toastr.warning("","Empty Fields!!");
    }

    }
 

}
