import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { GlobalService } from './global.service';
import { HttpModule } from '@angular/http';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NewProposalComponent } from './proposal/new-proposal/new-proposal.component';
import { ProposalsComponent } from './proposal/proposals/proposals.component';
import { NewResearchComponent } from './research/new-research/new-research.component';
import { ResearchesComponent } from './research/researches/researches.component';
import { ProjectDisciplineComponent } from './control-panel/project-discipline/project-discipline.component';
import { ProjectClassificationTypeComponent } from './control-panel/project-classification-type/project-classification-type.component';
import { UpdateProjectComponent } from './proposal/new-proposal/update-project/update-project.component';
import { ManageAuthorComponent } from './research/new-research/manage-author/manage-author.component';
import { UpdateResearchComponent } from './research/update-research/update-research.component';
import { ResearchStatusComponent } from './research/researches/research-status/research-status.component';
import { ResearchPdfComponent } from './research/researches/research-pdf/research-pdf.component';
import { Research0Component } from './research/researches/research-0/research-0.component';
import { Research1Component } from './research/researches/research-1/research-1.component';
import { Research2Component } from './research/researches/research-2/research-2.component';
import { RolesComponent } from './user-management/roles/roles.component';
import { RoleUpdateComponent } from './user-management/roles/role-update/role-update.component';
import { RoleAddComponent } from './user-management/roles/role-add/role-add.component';
import { AssignUserRolesComponent } from './user-management/assign-user-roles/assign-user-roles.component';
import { Research3Component } from './research/researches/research-3/research-3.component';
import { Research4Component } from './research/researches/research-4/research-4.component';
import { Research5Component } from './research/researches/research-5/research-5.component';
import { UserRoleManagementComponent } from './user-management/assign-user-roles/user-role-management/user-role-management.component';
import { PendingComponent } from './research/research-approval/pending/pending.component';
import { ViewResearchDetailComponent } from './research/research-approval/view-research-detail/view-research-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddressLookupComponent } from './registration/address-lookup/address-lookup.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ChangeStatusComponent } from './research/research-approval/change-status/change-status.component';
import { WithIssuesComponent } from './research/research-approval/with-issues/with-issues.component';
import { PublishedComponent } from './research/research-approval/published/published.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { CompanyComponent } from './control-panel/company/company.component';
import { AddUpdateComponent } from './control-panel/company/add-update/add-update.component';
import { AddUpdateProjdiscipComponent } from './control-panel/project-discipline/add-update-projdiscip/add-update-projdiscip.component';
import { GrantManagementComponent } from './control-panel/grant-management/grant-management.component';
import { GrantAddUpdateComponent } from './control-panel/grant-management/grant-add-update/grant-add-update.component';
import { ProposalWithIssuesComponent } from './proposal/proposal-approval/proposal-with-issues/proposal-with-issues.component';
import { ProposalPendingComponent } from './proposal/proposal-approval/proposal-pending/proposal-pending.component';
import { UserLookupComponent } from './user-management/assign-user-roles/user-lookup/user-lookup.component';
import { ProposalTrashComponent } from './proposal/proposals/proposal-trash/proposal-trash.component';
import { ProposalWithIssuesOwnerComponent } from './proposal/proposals/proposal-with-issues-owner/proposal-with-issues-owner.component';
import { ProposalPendingOwnerComponent } from './proposal/proposals/proposal-pending-owner/proposal-pending-owner.component';
import { ProposalPublishedOwnerComponent } from './proposal/proposals/proposal-published-owner/proposal-published-owner.component';
import { ProposalPublishedComponent } from './proposal/proposal-approval/proposal-published/proposal-published.component';
import { ProposalsStatusViewComponent } from './proposal/proposals/proposals-status-view/proposals-status-view.component';
import { ProposalDocumentComponent } from './proposal/proposals/proposal-document/proposal-document.component';
import { ViewProposalDetailsComponent } from './proposal/proposal-approval/view-proposal-details/view-proposal-details.component';
import { StatusChangeProposalComponent } from './proposal/proposal-approval/status-change-proposal/status-change-proposal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    NewProposalComponent,
    ProposalsComponent,
    NewResearchComponent,
    ResearchesComponent,
    ProjectDisciplineComponent,
    ProjectClassificationTypeComponent,
    UpdateProjectComponent,
    ManageAuthorComponent,
    UpdateResearchComponent,
    ResearchStatusComponent,
    ResearchPdfComponent,
    Research0Component,
    Research1Component,
    Research2Component,
    RolesComponent,
    RoleUpdateComponent,
    RoleAddComponent,
    AssignUserRolesComponent,
    Research3Component,
    Research4Component,
    Research5Component,
    UserRoleManagementComponent,
    PendingComponent,
    ViewResearchDetailComponent,
    RegistrationComponent,
    AddressLookupComponent,
    EditProfileComponent,
    ChangeStatusComponent,
    WithIssuesComponent,
    PublishedComponent,
    ChangePasswordComponent,
    CompanyComponent,
    AddUpdateComponent,
    AddUpdateProjdiscipComponent,
    GrantManagementComponent,
    GrantAddUpdateComponent,
    ProposalWithIssuesComponent,
    ProposalPendingComponent,
    UserLookupComponent,
    ProposalTrashComponent,
    ProposalWithIssuesOwnerComponent,
    ProposalPendingOwnerComponent,
    ProposalPublishedOwnerComponent,
    ProposalPublishedComponent,
    ProposalsStatusViewComponent,
    ProposalDocumentComponent,
    ViewProposalDetailsComponent,
    StatusChangeProposalComponent,
  ],
   entryComponents: [
    UpdateProjectComponent,
    ManageAuthorComponent,
    ResearchStatusComponent,
    ResearchPdfComponent,
    NewProposalComponent,
    NewResearchComponent,
    UpdateResearchComponent,
    RoleAddComponent,
    RoleUpdateComponent,
    UserRoleManagementComponent,
    ViewResearchDetailComponent,
    AddressLookupComponent,
    EditProfileComponent,
    ChangeStatusComponent,
    ChangePasswordComponent,
    AddUpdateComponent,
    AddUpdateProjdiscipComponent,
    GrantAddUpdateComponent,
    UserLookupComponent,
    ProposalsStatusViewComponent,
    ProposalDocumentComponent,
    ViewProposalDetailsComponent,
    StatusChangeProposalComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,StorageServiceModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
