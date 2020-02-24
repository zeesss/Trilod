import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-process-list',
  templateUrl: './sub-process-list.component.html',
  styleUrls: ['./sub-process-list.component.scss']
})
export class SubProcessListComponent implements OnInit {
  subprocess_name;
  description;
  process;
  subpro_list;
  subprocessList:Array<any>;
  subprocess_id;
  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }

  ngOnInit() {
    this.rest.subProcess_getAll().subscribe((data:any) => {

      if(data.responseCode=="00")
      {
        this.subpro_list=data.data;
        this.subprocessList=this.subpro_list;
      }
    }
    ,
    (err : HttpErrorResponse)=>{
      this.toastr.error('', 'Failed!');
      }
    );
  }
  openAddNew() {
    this.router.navigate(['dashboard/sub-process-add']);
  }
  editsubProcess(subprocess_id)
  {
    
    localStorage.setItem("edit-subprocess-id",subprocess_id);
    this.router.navigate(['dashboard/sub-process-edit']);
  }
  delete(id)
  {
    //alert(id);
    if(confirm("Are you sure to delete the record?"))
    {
      debugger;
      this.rest.subProcess_delete(id).subscribe((data:any) => {
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
