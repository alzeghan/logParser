import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Log } from 'src/app/model/log.model';
import { LogService } from 'src/app/services/log.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

interface LOGS {
    id: Number;
    file_name: String;
    description: String;
    owner: String;
    path: String;

}
@Component({
  selector: 'app-add-log',
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.css']
})


export class AddLogComponent implements OnInit {

  public baseUrl = 'http://localhost:8000/api';

   log: Log = {
    id:0,
    file_name: '',
    description: '',
    path: '',
    owner: '1'
  };


  public loadedLogs = [];
  submitted = false;
  public errorMessage: string = '';

    myForm = new FormGroup({
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });

  constructor(private logService: LogService, private http: HttpClient, private router: Router) { }


ngOnInit(): void {
  let isloggedin = localStorage.getItem('username');
  console.log('loading files', isloggedin);
  if(isloggedin != undefined && isloggedin != ''){

    this.http.get(this.baseUrl + '/log?ownerId='+isloggedin)
      .subscribe((res:any) => {
        console.log(res);

        this.loadedLogs = JSON.parse(JSON.stringify(res));

        console.log('files loaded Successfully.');
        // this.errorMessage = 'files loaded Successfully.';
      })
  }else{
    this.errorMessage = "Un-autherized ";
    this.router.navigate(["/login"]);
  }
}
id: String ="";
public selectedHero?: String;
onSelect(selectedLogId: String, selectedLogOwner: String): void {
  // console.log('selectedLogId: ' + selectedLogId + " selectedLogOwner: " + selectedLogOwner);
  this.id = selectedLogId;
  console.log('before sending id: ' + this.id);
  this.router.navigate(["/log-details/"])

}

logout(): void {
    let uToken = localStorage.getItem('id_token');
    if(uToken != undefined && uToken != '' ){
      localStorage.removeItem("id_token");
      localStorage.removeItem('username');
      console.log('Logged out Succesful');
      this.router.navigate(["/login"]);
    }

  }

  get f(){
    return this.myForm.controls;
  }

  /**
     * Write code on Method
     *
     * @return response()
     */
    onFileChange(event:any) {

      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.myForm.patchValue({
          fileSource: file
        });
      }
    }
    /**
  * Write code on Method
  *
  * @return response()
  */
 submit(){
   const formData = new FormData();
   let username = localStorage.getItem('username');
   formData.append('upload', this.myForm.get('fileSource')?.value);
   formData.append('ownerId', String(username));
   let isloggedin = localStorage.getItem('id_token');
   if(isloggedin != undefined && isloggedin != ''){

     this.http.post(this.baseUrl + '/upload', formData)
       .subscribe(res => {
         console.log(res);
         console.log('Uploaded Successfully.');
         this.errorMessage = 'Uploaded Successfully.';
       })
   }else{
     this.errorMessage = "Un-autherized ";
     this.router.navigate(["/login"]);
   }

 }

saveLog(): void {
    const data = {
      file_name: this.log.file_name,
      description: this.log.description,
      path: '/etc',
      owner: localStorage.getItem('username')
    };
    let isloggedin = localStorage.getItem('id_token');
    if(isloggedin != undefined && isloggedin != ''){

    this.logService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
    }else{
      this.errorMessage = "Un-autherized ";
      this.router.navigate(["/login"]);
    }
  }

  newLog(): void {
    this.submitted = false;
    this.log = {
      file_name: '',
      description: '',
      path: '/etc',
      owner: '1'
    };
  }

}
