import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
organizationList:Array<any>;
orgList;

  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }

  ngOnInit() {
    this.rest.listOrganization().subscribe((data:any) => {

      if(data.responseCode=="00")
      {
        // this.toastr.success("","Data saved!!");
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
  openAddNew() {
    this.router.navigate(['dashboard/organization-add']);
  }
  editOrganization( org_id)
  {
    localStorage.setItem("edit-organization-id",org_id);
    this.router.navigate(['dashboard/organization-edit']);
  }
  delete(id)
  {
    //alert(id);
    if(confirm("Are you sure to delete the record?"))
    {
    this.rest.organization_delete(id).subscribe((data:any) => {

      if(data.responseCode=="00")
      {
        this.toastr.success('', 'Deleted');
        location.reload();
      }
     
    }
    ,
    (err : HttpErrorResponse)=>{      
      this.toastr.error('', 'Failed!');
      }
    );
    }
  }
}
