import { Component } from '@angular/core';
import { AuthService } from '../app/Components/services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private bnIdle: BnNgIdleService,public auth:AuthService,public toastr: ToastrService) { // initiate it in your component constructor
    this.bnIdle.startWatching(5000).subscribe((res) => {
      if(res) {
          //console.log("session expired");
          this.toastr.error('Session Expired', 'Login Again!');
        this.auth.logout();
      }
    })
  }
}
