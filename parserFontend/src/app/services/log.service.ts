import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../model/log.model';

const baseUrl = 'http://localhost:8000/api/log';
@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Log[]> {
    return this.http.get<Log[]>(baseUrl);
  }

  get(id: any): Observable<Log> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByFile_name(filename: any): Observable<Log[]> {
    return this.http.get<Log[]>(`${baseUrl}?file_name=${filename}`);
  }

}
