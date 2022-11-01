import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Log } from 'src/app/model/log.model';
import { LogService } from 'src/app/services/log.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'parserFontend';
constructor(private http: HttpClient, private router: Router) { }
  logout(): void {
      let uToken = localStorage.getItem('id_token');
      if(uToken != undefined && uToken != '' ){
        localStorage.removeItem("id_token");
        localStorage.removeItem('username');
        console.log('Logged out Succesful');
        this.router.navigate(["/login"]);
      }

    }
}
