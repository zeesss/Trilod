import { MultisheetExcelTemplateComponent } from './multisheet-excel-template/multisheet-excel-template.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RiskControlMatrixComponent } from './risk-control-matrix/risk-control-matrix.component';
import { ControlAttributeComponent } from './control-attribute/control-attribute.component';
import { ImportFileComponent } from './import-file/import-file.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TopNavComponent } from './navbar/top-nav/top-nav.component';
import { MenuListItemComponent } from './navbar/menu-list-item/menu-list-item.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DashTabsComponent } from './dash-tabs/dash-tabs.component';
import { SearchComponent } from './search/search.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  MatTabsModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatToolbarModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatSelectModule,
} from '@angular/material';

import { AngularDraggableModule } from 'angular2-draggable';
import { ControlTaskComponent } from './control-task/control-task.component';
import { FileTypeComponent } from './file-type/file-type.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CompanyComponent } from './company/company.component';
import { SessionAuditComponent } from './session-audit/session-audit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionsComponent } from './sessions/sessions.component';
import { EditSessionComponent } from './edit-session/edit-session.component';
import { SampleFileComponent } from './sample-file/sample-file.component';
import { WorkPaperComponent } from './work-paper/work-paper.component';
import { EventLogComponent } from './event-log/event-log.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { RolesComponent } from './roles/roles.component';
import { UserComponent } from './user/user.component';
import { ConvertToExcelComponent } from './convert-to-excel/convert-to-excel.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { AddTemplateComponent } from './template/add-template/add-template.component';
import { RuleListComponent } from './rule/rule-list/rule-list.component';
import { AddRuleComponent } from './rule/add-rule/add-rule.component';
import { ControlListComponent } from './control/control-list/control-list.component';
import { AddControlComponent } from './control/add-control/add-control.component';
import { AuditControlsComponent } from './audit/audit-controls/audit-controls.component';
import { AddEvidencesComponent } from './add-evidences/add-evidences.component';
import { OrganizationAddComponent } from './organization/organization-add/organization-add.component';
import { ControlTemplateMappingComponent } from './control-template-mapping/control-template-mapping.component';
const dashboardRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '', component: DashTabsComponent,
        children: [
          { path: '', component: SessionsComponent },
          { path: 'controlTask', component: ControlTaskComponent },
          { path: 'fileType', component: FileTypeComponent },
          { path: 'company', component: CompanyComponent },
          { path: 'newSessionAudit', component: SessionAuditComponent },
          { path: 'import-file', component: ImportFileComponent },
          { path: 'upload-file', component: UploadFileComponent },
          { path: 'sessions', component: SessionsComponent },
          { path: 'editSessionAudit', component: EditSessionComponent },
          { path: 'sampleFile', component: SampleFileComponent },
          { path: 'workPaper', component: WorkPaperComponent },
          { path: 'eventLog', component: EventLogComponent },
          { path: 'config', component: ConfigurationComponent },
          { path: 'roles', component: RolesComponent },
          { path: 'users', component: UserComponent },
          { path: 'controlAttribute', component: ControlAttributeComponent },
          { path: 'riskControlMatrix', component: RiskControlMatrixComponent },
          { path: 'convertToExcel', component: ConvertToExcelComponent },
          { path: 'assignForms', component: RoleEditComponent },
          { path: 'template', component: TemplateListComponent },
          { path: 'addTemplate', component: AddTemplateComponent },
          { path: 'rule', component: RuleListComponent },
          { path: 'addRule', component: AddRuleComponent },
          { path: 'control', component: ControlListComponent },
          { path: 'addControl', component: AddControlComponent },
          { path: 'auditControl', component: AuditControlsComponent },
          { path: 'addEvidences', component: AddEvidencesComponent },
          { path: 'organization-add', component:OrganizationAddComponent},
          { path:'controlTemplateMapping',component:ControlTemplateMappingComponent},
          { path:'multisheetExcel', component:MultisheetExcelTemplateComponent}

          
        ]
      },
    ]
  }
];

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    TopNavComponent,
    MenuListItemComponent,
    DashTabsComponent,
    ControlTaskComponent,
    FileTypeComponent,
    CompanyComponent,
    SessionAuditComponent,
    ImportFileComponent,
    SessionsComponent,
    EditSessionComponent,
    SampleFileComponent,
    WorkPaperComponent,
    EventLogComponent,
    ConfigurationComponent,
    RolesComponent,
    UserComponent,
    ControlAttributeComponent,
    RiskControlMatrixComponent,
    RoleEditComponent,
    ConvertToExcelComponent,
    UploadFileComponent,
    TemplateListComponent,
    AddTemplateComponent,
    RuleListComponent,
    AddRuleComponent,
    ControlListComponent,
    AddControlComponent,
    AuditControlsComponent,
    AddEvidencesComponent,
    OrganizationAddComponent,
    ControlTemplateMappingComponent,
    MultisheetExcelTemplateComponent
  ],
  entryComponents: [],
  imports: [
    RouterModule.forChild(dashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatSelectModule,
    AngularDraggableModule,
  ],
  exports: [RouterModule],
  providers: [ImportFileComponent]
})
export class DashboardModule {
}
