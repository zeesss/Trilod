import { StartAudit } from './Components/dashboard/sessions/sessions.component';
import { AddFile } from './Components/dashboard/session-audit/session-audit.component';
import { MapTemplate } from './Components/dashboard/rule/add-rule/add-rule.component';
import { AddFileAuditDialog } from './Components/dashboard/audit/audit-controls/audit-controls.component';
import { DialogUserAdd, DialogUserEdit } from './Components/dashboard/user/user.component';
import { DialogRoleAdd } from './Components/dashboard/roles/roles.component';
import { DialogOverviewExampleDialog3 } from './Components/dashboard/company/company.component';
import { ConfirmationComponent } from './Components/dashboard/confirmation/confirmation.component';
import { ConfirmationService } from './Components/dashboard/confirmation/confirmation.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavService } from './Components/dashboard/navbar/nav.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, PaginationModule, TooltipModule } from 'ngx-bootstrap';
import { RestService } from '../app/Components/services/rest/rest.service';
import { AuthService } from '../app/Components/services/auth/auth.service';
import { TopNavComponent } from './Components/dashboard/navbar/top-nav/top-nav.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { OrderModule } from 'ngx-order-pipe';
import { DialogOverviewExampleDialog } from './Components/dashboard/control-task/control-task.component';
import { DialogOverviewExampleDialog2 } from './Components/dashboard/file-type/file-type.component';
import { DialogOverviewExampleDialog4 } from './Components/dashboard/control-attribute/control-attribute.component';
import { DialogOverviewExampleDialog5 } from './Components/dashboard/risk-control-matrix/risk-control-matrix.component';
import { FormsModule } from '@angular/forms';
import { DashTabsComponent } from './Components/dashboard/dash-tabs/dash-tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../app/Components/public/login/login.component';
import { AdsenseModule } from 'ng2-adsense';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
    DialogOverviewExampleDialog3,
    DialogOverviewExampleDialog4,
    DialogOverviewExampleDialog5,
    DialogRoleAdd,
    DialogUserAdd,
    DialogUserEdit,
    NgbdModalContent,
    AddFile,
    MapTemplate,
    AddFileAuditDialog,
    StartAudit,
    ConfirmationComponent
  ],
  imports: [
    NgbModule,
    NgxPaginationModule,
    BrowserModule,
    FormsModule,
    OrderModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],

  providers: [
    NavService,
    RestService,
    AuthService,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
    BnNgIdleService,
    DashTabsComponent,
    ConfirmationService
  ],
  bootstrap: [AppComponent],

  entryComponents: [
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
    DialogOverviewExampleDialog3,
    DialogOverviewExampleDialog4,
    DialogOverviewExampleDialog5,
    DialogRoleAdd,
    DialogUserAdd,
    DialogUserEdit,
    NgbdModalContent,
    AddFile,
    MapTemplate,
    AddFileAuditDialog,
    StartAudit,
    ConfirmationComponent]
})
export class AppModule { }
