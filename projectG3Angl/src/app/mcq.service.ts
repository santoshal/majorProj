import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class McqService {
  getScore(qid: number) {
    return this.http.get('http://localhost:8080/api/sc/' + qid);
  }
  getallquestions(qid: number) {
    return this.http.get('http://localhost:8080/api/status/allque/' + qid);
  }
  getStatusList(uid: number, qid: number) {
    return this.http.get('http://localhost:8080/api/status/' + uid + '/' + qid);
  }
  insertstatus(status: any) {
    return this.http.post('http://localhost:8080/api/status', status);
  }
  saveScore(score: any) {
    return this.http.post('http://localhost:8080/api/sc', score);
  }

  getTimer(qid: number) {
    return this.http.get('http://localhost:8080/api/timer/' + qid);
  }

  constructor(private http: HttpClient) {}
}
