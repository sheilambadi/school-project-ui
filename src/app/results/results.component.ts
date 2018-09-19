import { SchoolService } from './../service/school.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public results = [];
  exams;
  examId;

  constructor(private service: SchoolService) {
  }

  ngOnInit() {
    this.service.getResultsByExam(1).subscribe(data => {
      this.results = data;
      // console.log(data);
    });

    this.service.getExams().subscribe(data => {
      this.exams = data;
      // console.log(data);
    });
  }

  onChange(examId) {
    this.examId = examId;

    this.service.getResultsByExam(examId).subscribe(data => {
      this.results = data;
      // console.log(data);
    });
  }

}
