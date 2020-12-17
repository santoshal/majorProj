import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/quizes';
@Injectable({
  providedIn: 'root'
})
export class SearchQuizeService {
  
  
  constructor(private http: HttpClient) { }
  // findByTitle(quizname: any): Observable<any> {
  //   return this.http.get<any>(`${baseUrl}`,quizname);
  // }
  findAllquize(){
    return this.http.get("http://localhost:8080/api/quizes");
  }
}
