import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-add',
  templateUrl: './organization-add.component.html',
  styleUrls: ['./organization-add.component.scss']
})
export class OrganizationAddComponent implements OnInit {
name;
city;
country;
state;
postalcode;
email;
street;
saveBody=
{
  "city":"",
  "country":"",
  "email":"",
  "name":"",
  "postalCode":"",
  "state":"",
  "street":""
};
  constructor(public toastr:ToastrService,public rest:RestService,private router: Router) { }

  ngOnInit() {
  }
onSaveButton()
{
  this.saveBody=
{
  "city":"",
  "country":"",
  "email":"",
  "name":"",
  "postalCode":"",
  "state":"",
  "street":""
};
this.saveBody.name=this.name;
this.saveBody.city=this.city;
this.saveBody.country=this.country;
this.saveBody.state=this.state;
this.saveBody.street=this.street;
this.saveBody.email=this.email;
this.saveBody.postalCode=this.postalcode;
this.rest.addOrganization(this.saveBody).subscribe((data:any) => {

  if(data.responseCode=="00")
  {
    this.toastr.success("","Data saved!!");
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

