import { SchoolService } from './../service/school.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  public students = [];
  admNo;
  firstName;
  lastName;
  studentBody;

  constructor(private service: SchoolService) { }

  ngOnInit() {
    this.service.getStudents().subscribe(data => {
      this.students = data;
      console.log(data);
    });
  }

  addStudent() {
    this.studentBody = {
      admNo: this.admNo,
      firstName: this.firstName,
      lastName: this.lastName
    };

    // console.log(this.studentBody);

    this.service.postStudent(this.studentBody).subscribe(data => {
      console.log(data);
    });
  }

}
