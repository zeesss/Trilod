import { Observable } from 'rxjs';
import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { resolve } from 'url';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-template',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})

export class TemplateListComponent implements OnInit {
  dataSource;

  constructor(public toastr: ToastrService, public dialog: MatDialog, public rest: RestService,
    public http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getAllTemplates(localStorage.getItem("clientId"));
  }

  getAllTemplates(cleintId) {
    this.rest.getTemplateList(cleintId).subscribe((data: {}) => {
      if (data['responseCode'] === '00') {
        this.dataSource = data['data'];
      }
    }
    );
  }

  openAddNew() {
    this.router.navigate(['dashboard/addTemplate']);
  }

  openView(val) {

  }

  openEdit(val) {

  }

  deleteRecord(i, rowId) {
    if (confirm("Are you sure to delete the record?")) {
      // Api Call
    }
  }
}


