import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddLogComponent } from './components/add-log/add-log.component';
import { LogDetailsComponent } from './components/log-details/log-details.component';
import { LogListComponent } from './components/log-list/log-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from './components/signup-up-page/signup-up-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddLogComponent,
    LogDetailsComponent,
    LogListComponent,
    LoginPageComponent,
    SignUpPageComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
