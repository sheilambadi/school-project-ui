import { SchoolService } from './service/school.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { ExamsComponent } from './exams/exams.component';
import { ResultsComponent } from './results/results.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { AddResultComponent } from './add-result/add-result.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    ExamsComponent,
    ResultsComponent,
    NavbarComponent,
    StudentResultComponent,
    AddStudentComponent,
    AddExamComponent,
    AddResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'students/:id',
        component: StudentResultComponent
      },
      {
        path: 'new/student',
        component: AddStudentComponent
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'new/exam',
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
      }
    ])
  ],
  providers: [
    SchoolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
