import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { NewProposalComponent } from './proposal/new-proposal/new-proposal.component';
import { ProposalsComponent } from './proposal/proposals/proposals.component';
import { NewResearchComponent } from './research/new-research/new-research.component';
import { ResearchesComponent } from './research/researches/researches.component';
import { UpdateResearchComponent } from './research/update-research/update-research.component';
import { ProjectDisciplineComponent } from './control-panel/project-discipline/project-discipline.component';
import { Research0Component } from './research/researches/research-0/research-0.component';
import { Research1Component } from './research/researches/research-1/research-1.component';
import { Research2Component } from './research/researches/research-2/research-2.component';
import { RolesComponent } from './user-management/roles/roles.component';
import { AssignUserRolesComponent } from './user-management/assign-user-roles/assign-user-roles.component';
import { Research3Component } from './research/researches/research-3/research-3.component';
import { Research4Component } from './research/researches/research-4/research-4.component';
import { Research5Component } from './research/researches/research-5/research-5.component';
import { PendingComponent } from './research/research-approval/pending/pending.component';
import { RegistrationComponent } from './registration/registration.component';
import { WithIssuesComponent } from './research/research-approval/with-issues/with-issues.component';
import { PublishedComponent } from './research/research-approval/published/published.component';
import { CompanyComponent } from './control-panel/company/company.component';
import { GrantManagementComponent } from './control-panel/grant-management/grant-management.component';


import { ProposalTrashComponent } from './proposal/proposals/proposal-trash/proposal-trash.component';
import { ProposalWithIssuesOwnerComponent } from './proposal/proposals/proposal-with-issues-owner/proposal-with-issues-owner.component';
import { ProposalPendingOwnerComponent } from './proposal/proposals/proposal-pending-owner/proposal-pending-owner.component';
import { ProposalPublishedOwnerComponent } from './proposal/proposals/proposal-published-owner/proposal-published-owner.component';

import { ProposalPublishedComponent } from './proposal/proposal-approval/proposal-published/proposal-published.component';
import { ProposalWithIssuesComponent } from './proposal/proposal-approval/proposal-with-issues/proposal-with-issues.component';
import { ProposalPendingComponent } from './proposal/proposal-approval/proposal-pending/proposal-pending.component';
import { FrontComponent } from './pages/front/front.component';
import { ResearchComponent } from './pages/research/research.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { DevelopersComponent } from './pages/developers/developers.component';

import { SearchComponent } from './pages/search/search.component';
import { ResearchesPageComponent } from './pages/researches-page/researches-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'All-Researches',
    component: ResearchesPageComponent
  },
  {
    path: 'Search',
    component: SearchComponent
  },
  {
    path: 'Overview',
    component: OverviewComponent
  },
  {
    path: 'Developers',
    component: DevelopersComponent
  },
  {
    path: 'research',
    component: ResearchComponent
  },
  {
    path: 'home',
    component: FrontComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'main',
    component: MainComponent,
      children: [
        { path: '', component: HomeComponent, outlet: 'div' },
        { path: 'home', component: HomeComponent, outlet: 'div' },
        { path: 'new-proposal', component: NewProposalComponent, outlet: 'div' },
        { path: 'new-research', component: NewResearchComponent, outlet: 'div' },
        { path: 'researches', component: ResearchesComponent, outlet: 'div' },
        { path: 'discipline', component: ProjectDisciplineComponent, outlet: 'div' },
        { path: 'update-research', component: UpdateResearchComponent, outlet: 'div' },
        { path: 'update-proposal', component: NewProposalComponent, outlet: 'div' },
        { path: 'Research', component: Research0Component, outlet: 'div' },
        { path: 'researches-Pending', component: Research1Component, outlet: 'div' },
        { path: 'researches-Published', component: Research2Component, outlet: 'div' },
        { path: 'researches-WithIssues', component: Research3Component, outlet: 'div' },
        { path: 'researches-ApprovedEdit', component: Research4Component, outlet: 'div' },
        { path: 'researches-Trash', component: Research5Component, outlet: 'div' },
        { path: 'roles', component: RolesComponent, outlet: 'div' },
        { path: 'assign-user-roles', component: AssignUserRolesComponent, outlet: 'div' },
        { path: 'researches-PendingApproval', component: PendingComponent, outlet: 'div' },
        { path: 'researches-WithIssue', component: WithIssuesComponent, outlet: 'div' },
        { path: 'Published', component: PublishedComponent, outlet: 'div' },
        { path: 'Company-Management', component: CompanyComponent, outlet: 'div' },
        { path: 'Call-for-proposals', component: GrantManagementComponent, outlet: 'div' },

        { path: 'proposals', component: ProposalsComponent, outlet: 'div' },
        { path: 'proposals-Pending', component: ProposalPendingOwnerComponent, outlet: 'div' },
        { path: 'proposals-Published', component: ProposalPublishedOwnerComponent, outlet: 'div' },
        { path: 'proposals-WithIssues', component: ProposalWithIssuesOwnerComponent, outlet: 'div' },
        { path: 'proposals-Trash', component: ProposalTrashComponent, outlet: 'div' },


        { path: 'proposal-Management-Published', component: ProposalPublishedComponent, outlet: 'div' },
        { path: 'proposal-Management-WithIssues', component: ProposalWithIssuesComponent, outlet: 'div' },
        { path: 'proposal-Management-Pending', component: ProposalPendingComponent, outlet: 'div' },
      ]
  },
  {
    path: '**', component: FrontComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
