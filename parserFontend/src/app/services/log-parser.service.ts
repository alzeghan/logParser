import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogParser } from '../models/log.model';

const baseUrl = 'http://localhost:8000/api/log';

@Injectable({
  providedIn: 'root'
})
export class LogParserService {
    id?: any;
    file_name?: string;
    description?: string;
    published?: boolean;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    // return this.http.get(`${baseUrl}/${id}`);
    return this.http.get(`${baseUrl}/1`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByFile_name(title) {
    return this.http.get(`${baseUrl}?file_name=${title}`);
  }
}
