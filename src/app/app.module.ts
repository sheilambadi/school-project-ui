import { Student } from './interfaces/student';
import { SchoolService } from './service/school.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'angular2-highcharts'

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { ExamsComponent } from './exams/exams.component';
import { ResultsComponent } from './results/results.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { AddResultComponent } from './add-result/add-result.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddExamComponent } from './add-exam/add-exam.component';

declare var require: any;
@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    ExamsComponent,
    ResultsComponent,
    NavbarComponent,
    StudentResultComponent,
    AddResultComponent,
    AddStudentComponent,
    AddExamComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartModule.forRoot(require('highcharts')),
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'students/:id',
        component: StudentResultComponent
      },
      {
        path: 'new/students',
        component: AddStudentComponent
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'new/exams',
        component: AddExamComponent
      },
      {
        path: 'exams',
        component: ExamsComponent
      },
      {
        path: 'new/result',
        component: AddResultComponent
      },
      {
        path: 'results',
        component: ResultsComponent
      },
      {
        path: '**',
        redirectTo: '/students',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    SchoolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
