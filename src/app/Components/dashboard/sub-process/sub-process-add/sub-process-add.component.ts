import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-sub-process-add',
  templateUrl: './sub-process-add.component.html',
  styleUrls: ['./sub-process-add.component.scss']
})
export class SubProcessAddComponent implements OnInit {
p_list;
processList:Array<any>;
saveBody={
  "processId":0,
  "description":"",
  "name":""
};
subprocess_name;
description;
process;
process_id;
  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }

  ngOnInit() {
    this.rest.process_getAll().subscribe((data:any) => {

      if(data.responseCode=="00")
      {
        this.p_list=data.data;
        this.processList=this.p_list;
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
    if (!this.isEmpty(this.subprocess_name) && !this.isEmpty(this.process))
    {
      this.processList.forEach(element => {
        if(element.name==this.process)
        {
          this.process_id=element.id;
        }
      });
      this.saveBody.processId=this.process_id;
      this.saveBody.name=this.subprocess_name;
      this.saveBody.description=this.description;
      $('#loader').addClass('loader');
      this.rest.subProcess_add(this.saveBody).subscribe((data:any) => {

        if(data.responseCode=="00")
        {
          this.toastr.success("","Data saved!!");
          this.router.navigate(['dashboard/sub-process/']);
        }
      }
      ,
      (err : HttpErrorResponse)=>{
        this.toastr.error('', 'Failed!');
        }
      );
      $('#loader').removeClass('loader');
    }
    else
    {
      this.toastr.warning("","Empty Fields!!");
    }
  }
}
