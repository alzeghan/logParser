import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public baseUrl = 'http://localhost:8000/api';
  public loginForm!: FormGroup
  public errorMessage: string = '';

  constructor(private formbuilder: FormBuilder,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: [''],
      password: ['', Validators.required]
    })
  }


  login(){
    console.log('IN LOGIN');
    let userToken;
    let username;
    const formData = new FormData();
    formData.append('username', this.loginForm.value.username);
    formData.append('password', this.loginForm.value.password);
    console.log('username: ' + this.loginForm.value.username + " Password: " + this.loginForm.value.password);
    this.http.post(this.baseUrl + '/login/', formData)
      .subscribe((res:any) => {

            userToken = res['token'];
            username = res['username'];

            localStorage.setItem('id_token', userToken);
            localStorage.setItem('username', username);

            console.log(localStorage.getItem('id_token'));
            this.loginForm.reset()
            console.log('Login Succesful');
            this.router.navigate(["/logs"]);

    },
    response => {
            console.log("Login error", response.error);
            this.errorMessage = response.error;
    })
}




}
