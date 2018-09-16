import { SchoolService } from './../service/school.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public students = [];

  constructor(private service: SchoolService) { }

  ngOnInit() {
    this.service.getStudents().subscribe(data => {
      this.students = data;
      console.log(data);
    });
  }

}
