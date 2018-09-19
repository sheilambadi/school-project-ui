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
      'Content-Type': 'application/json'
    })
  };

  baseUrl = 'http://localhost:8080/school-project/api/school/';
  excelUrl = 'http://localhost:8080/school-project/api/excel/';

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

  getStudentExam(studentId, examId): Observable<Result> {
    return this.httpClient.get<Result>(this.baseUrl + 'students/' + studentId + '/' + examId);
  }

  postExams(exam: Exam): Observable<Exam> {
    return this.httpClient.post<Exam>(this.baseUrl + 'exams/new', exam, this.httpOptions);
  }

  postStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.baseUrl + 'students/new', student, this.httpOptions);
  }

  postResults(result: Result): Observable<Result> {
    return this.httpClient.post<Result>(this.baseUrl + 'results/new', result, this.httpOptions);
  }
  downloadExamExcel() {
    return this.httpClient.get(this.excelUrl + 'exams', { responseType: 'blob' });
  }

  downloadStudentExcel() {
    return this.httpClient.get(this.excelUrl + 'students', { responseType: 'blob' });
  }

  downloadResultExcel() {
    return this.httpClient.get(this.excelUrl + 'results', { responseType: 'blob' });
  }

  getStudentById(id: number): Observable<Student> {
    return this.httpClient.get<Student>(this.baseUrl + 'student/data/' + id);
  }

  getExamById(id: number): Observable<Exam> {
    return this.httpClient.get<Exam>(this.baseUrl + 'exam/data/' + id);
  }

  getResultsByExam(id): Observable<Result[]> {
    return this.httpClient.get<Result[]>(this.baseUrl + 'exams/' + id);
  }
}
