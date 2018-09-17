import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Student } from '../interfaces/student';
import { Exam } from '../interfaces/exam';
import { Result } from '../interfaces/result';

@Injectable()
export class SchoolService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

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

  postExams(exam: Exam): Observable<Exam> {
    return this.httpClient.post<Exam>(this.baseUrl + 'exams/new', exam, this.httpOptions);
  }

  postStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.baseUrl + 'students/new', student, this.httpOptions);
  }

}
