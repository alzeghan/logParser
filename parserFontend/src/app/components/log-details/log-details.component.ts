import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.css']
})
export class LogDetailsComponent implements OnInit {

  public baseUrl = 'http://localhost:8000/api';
  public loadedLogs = [];

  public errorMessage: string = '';

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient) {
    console.log('in details page');

  }

  ngOnInit(): void {

    console.log('in details page');
    console.log(this.route.snapshot.paramMap.get("id"));


    let isloggedin = localStorage.getItem('username');
    console.log('loading files', isloggedin);
    if(isloggedin != undefined && isloggedin != ''){

      this.http.get(this.baseUrl + '/log/'+String(this.route.snapshot.paramMap.get("id")))
        .subscribe((res:any) => {
          console.log(res);

          this.loadedLogs = JSON.parse(JSON.stringify(res));

          console.log('files loaded Successfully.');
          this.errorMessage = 'files loaded Successfully.';
        })
    }else{
      this.errorMessage = "Un-autherized ";
      this.router.navigate(["/login"]);
    }
  
  }

}
