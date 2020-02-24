import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { HttpErrorResponse,HttpHeaders, HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
clientL;
clientList:Array<any>;
client_id;
  constructor(public toastr:ToastrService,public rest:RestService, private router: Router) { }

  ngOnInit() {
    this.rest.getAllClient().subscribe((data:any) => {

      if(data.responseCode=="00")
      {
        // this.toastr.success("","Data saved!!");
        this.clientL=data.data;
        this.clientList=this.clientL;
      }
     
    }
    ,
    (err : HttpErrorResponse)=>{
              
              
      this.toastr.error('', 'Failed!');
      
      }
    );
  }
  openAddNew() {
    this.router.navigate(['dashboard/client-add']);
  }
  editClient( c_id)
  {
    
    localStorage.setItem("edit-client-id",c_id);
    this.router.navigate(['dashboard/client-edit']);
  }
  delete(id)
  {
    //alert(id);
    if(confirm("Are you sure to delete the record?"))
    {
      debugger;
      this.rest.deleteClient(id).subscribe((data:any) => {
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
