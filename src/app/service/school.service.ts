import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Student } from '../interfaces/student';
import { Exam } from '../interfaces/exam';
import { Result } from '../interfaces/result';

@Injectable()
export class SchoolService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:8080/school-project/api/school/';

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseUrl + 'students');
  }

  getExams(): Observable<Exam[]> {
    return this.httpClient.get<Exam[]>(this.baseUrl + 'exams');
  }

  getResults(): Observable<Result[]> {
    return this.httpClient.get<Result[]>(this.baseUrl + 'results');
  }

  getStudentResultById(id): Observable<Result[]> {
    return this.httpClient.get<Result[]>(this.baseUrl + 'students/' + id);
  }

}
