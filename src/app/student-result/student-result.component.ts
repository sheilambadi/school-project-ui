import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../service/school.service';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.css']
})
export class StudentResultComponent implements OnInit {
  public results = [];
  id;

  constructor(private route: ActivatedRoute, private service: SchoolService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // console.log(params);
      this.id = params.get('id');

      this.service.getStudentResultById(this.id).subscribe(data => {
        this.results = data;
        console.log(data);
      });
    });
  }

}
