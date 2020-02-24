import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-add',
  templateUrl: './process-add.component.html',
  styleUrls: ['./process-add.component.scss']
})
export class ProcessAddComponent implements OnInit {
c_list;
clientList:Array<any>;
process_name;
client;
description;
client_id;
saveBody={
    "clientId":0,
    "description":"",
    "name":""
};
  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }

  ngOnInit() {
    this.rest.getAllClient().subscribe((data:any) => {

      if(data.responseCode=="00")
      {
        this.c_list=data.data;
        this.clientList=this.c_list;
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
    if (!this.isEmpty(this.process_name) && !this.isEmpty(this.client))
    {
      this.clientList.forEach(element => {
        if(element.clientName==this.client)
        {
          this.client_id=element.id;
        }
      });
      this.saveBody.clientId=this.client_id;
      this.saveBody.name=this.process_name;
      this.saveBody.description=this.description;
      this.rest.process_add(this.saveBody).subscribe((data:any) => {

        if(data.responseCode=="00")
        {
          this.toastr.success("","Data saved!!");
          this.router.navigate(['dashboard/process/']);
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
