import { RestService } from 'src/app/Components/services/rest/rest.service';
import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-template-mapping',
  templateUrl: './control-template-mapping.component.html',
  styleUrls: ['./control-template-mapping.component.scss']
})
export class ControlTemplateMappingComponent implements OnInit {
  template1="";
  template2="";
  constructor() { }

  ngOnInit() {
  }

}
