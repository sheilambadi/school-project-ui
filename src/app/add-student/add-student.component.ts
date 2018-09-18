import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../service/school.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  admNo;
  firstName;
  lastName;
  studentBody;

  constructor(private service: SchoolService, private router: Router) { }

  ngOnInit() {
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
      this.router.navigate(['/students']);
    });
  }
}
