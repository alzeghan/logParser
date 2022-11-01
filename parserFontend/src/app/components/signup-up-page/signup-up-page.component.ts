import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-signup-up-page',
  templateUrl: './signup-up-page.component.html',
  styleUrls: ['./signup-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  public signUpForm !: FormGroup
  public errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: [""],
      username: [""],
      password: [""]
    })
  }


  private onError(response: HttpErrorResponse): void {
    const status: number = response.status;
    const serverErrorMessage = response.error;
console.log("Bad request",serverErrorMessage); //or you can print the serverErrorMessage

  }

  signUp(){
    this.http.post<any>("http://localhost:8000/api/signup/",this.signUpForm.value)
    .subscribe((res:any) => {

        console.log(res);
        let firstData = JSON.stringify(res);
        console.log(firstData);

      this.signUpForm.reset()
      this.router.navigate(["login"])
    },
    response => {
            console.log("POST call in error", response.error);
            this.errorMessage = response.error;
    });

  }

}
