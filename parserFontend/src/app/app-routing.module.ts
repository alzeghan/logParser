import { NgModule } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { LogListComponent } from './components/log-list/log-list.component';
import { LogDetailsComponent } from './components/log-details/log-details.component';
import { AddLogComponent } from './components/add-log/add-log.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from    './components/signup-up-page/signup-up-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'log', pathMatch: 'full' },
  { path: 'log', component: LogListComponent },
  // { path: 'log-details/:id', component: LogDetailsComponent ,pathMatch: 'full'},
  { path: 'log-details/:id', component: LogDetailsComponent},
  { path: 'logs', component: AddLogComponent },
  {path:"login", component:LoginPageComponent},
  {path:"signup", component:SignUpPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
