import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Student } from '../interfaces/student';

@Injectable()
export class SchoolService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:8080/school-project/api/school/';

  // getMovies(): Observable<Student[]> {
  //   // returns observable of type array
  //   return this.httpClient.get<Student[]>(this.baseUrl);
  // }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseUrl + 'students');
  }

  // hey(){
  //   console.log("Hey");
  // }

}
