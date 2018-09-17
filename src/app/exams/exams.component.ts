import { SchoolService } from './../service/school.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  public exams = [];
  examName;
  examBody;

  constructor(private service: SchoolService) { }

  ngOnInit() {
    this.service.getExams().subscribe(data => {
      this.exams = data;
      console.log(data);
    });
  }

  addExam() {
    this.examBody = {
      examName: this.examName
    };

    // console.log(this.examBody);
    this.service.postExams(this.examBody).subscribe(data => {
      console.log(data);
    });
  }

}
