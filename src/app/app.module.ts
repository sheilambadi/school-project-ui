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
import { AddResultComponent } from './add-result/add-result.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    ExamsComponent,
    ResultsComponent,
    NavbarComponent,
    StudentResultComponent,
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
        path: 'students',
        component: StudentsComponent
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
