import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {NgbModal, ModalDismissReasons,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  uploadForm1: FormGroup;
    showSpinner = false;
    closeResult: string;
  constructor(private modalService: NgbModal,public dialog: MatDialog,private router: Router, private auth: AuthService, public toastr: ToastrService,
    public http:HttpClient,public formBuilder:FormBuilder, public formsModule:FormsModule, public reactiveFormsModule:ReactiveFormsModule) { }
   public username: string;
   public password: string;
  public loading = false;
  isVisible=false;
  
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
  ngOnInit() {
    this.uploadForm1 = this.formBuilder.group({
     
      username: new FormControl(),
       password:new FormControl()
    });
  }
  login(): void {
    debugger;
//     this.auth.login(this.username, this.password);
//  this.isVisible=true;
  
//if ( this.username === 'doc1' && this.password === 'Password123') {
  this.username=this.uploadForm1.get('username').value;
  this.password=this.uploadForm1.get('password').value;
  //alert(this.username);
  //alert(this.password);
 
        debugger;
    if ( this.username && this.password) {
      this.auth.login(this.username, this.password);
      this.isVisible=true;
    }
    else if ( this.username==="" || this.password===""  ) {
      this.toastr.error('Empty Fields', 'Login Failed!');
      
    }
    else if ( this.username===null&&this.password===null ) {
      this.toastr.error('Empty Fields', 'Login Failed!');
      
    }
     else {
      this.toastr.error('Invalid user or password', 'Login Failed!');
    }
  }
forgotpassword(){
    this.router.navigate(['forgotpassword']);   
}


  /* demoLogin(): void {

  } */
}
