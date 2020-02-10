import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { json } from '_node_modules/@angular-devkit/core/src';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class OrganizationEditComponent implements OnInit {

  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }
edit_org_id;
editList:Array<any>;
editL;
name;
city;
country;
state;
postalcode;
email;
street;
updatedBody=
{
  "city":"",
  "country":"",
  "email":"",
  "name":"",
  "postalCode":"",
  "state":"",
  "street":"",
  "updatedAt": "",
  "createdAt": ""
};
editBody=
{
  "city":"",
  "country":"",
  "email":"",
  "name":"",
  "postalCode":"",
  "state":"",
  "street":"",
  "updatedAt": "",
  "createdAt": ""
};
  ngOnInit() {
    this.edit_org_id=localStorage.getItem("edit-organization-id");
    //alert(this.edit_org_id);
    this.rest.organization_findById(this.edit_org_id).subscribe((data:any) => {

      if(data.responseCode=="00")
      {
        // this.toastr.success("","Data saved!!");
        this.editBody=data.data[0];
      //  alert(JSON.stringify(this.editBody));
        this.name=this.editBody.name;
     //   alert(this.editBody.name);
      //  alert(this.name);
       // this.editList=this.editL;
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
    //alert(this.editBody.name);
    this.rest.organization_update(this.edit_org_id,this.editBody).subscribe((data:any) => {

      if(data.responseCode=="00")
      {
        this.toastr.success('', 'Updated!');
        this.router.navigate(['dashboard/organization/']);
      }
     
    }
    ,
    (err : HttpErrorResponse)=>{      
      this.toastr.error('', 'Failed!');
      }
    );
  }


}
