import { SchoolService } from './../service/school.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  public exams = [];

  constructor(private service: SchoolService) { }

  ngOnInit() {
    // console.log('Data: ' + this.data);
    this.service.getExams().subscribe(data => {
      this.exams = data;
      console.log(data);
    });
  }
}
