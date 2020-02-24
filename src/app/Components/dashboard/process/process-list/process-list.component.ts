import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit {

  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }
process_name;
description;
client;
pro_list;
processList:Array<any>;
process_id;
  ngOnInit() {
    this.rest.process_getAll().subscribe((data:any) => {

      if(data.responseCode=="00")
      {
        this.pro_list=data.data;
        this.processList=this.pro_list;
      }
    }
    ,
    (err : HttpErrorResponse)=>{
      this.toastr.error('', 'Failed!');
      }
    );
  }
  openAddNew() {
    this.router.navigate(['dashboard/process-add']);
  }
  editProcess(process_id)
  {
    
    localStorage.setItem("edit-process-id",process_id);
    this.router.navigate(['dashboard/process-edit']);
  }
  delete(id)
  {
    //alert(id);
    if(confirm("Are you sure to delete the record?"))
    {
      debugger;
      this.rest.process_delete(id).subscribe((data:any) => {
        console.log(data);
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
   
  } //delete end

}
