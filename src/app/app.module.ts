import { SchoolService } from './service/school.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { ExamsComponent } from './exams/exams.component';
import { ResultsComponent } from './results/results.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    ExamsComponent,
    ResultsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'exams',
        component: ExamsComponent
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
