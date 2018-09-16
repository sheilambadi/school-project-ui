import { SchoolService } from './../service/school.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public results = [];

  constructor(private service: SchoolService) { }

  ngOnInit() {
    this.service.getResults().subscribe(data => {
      this.results = data;
      console.log(data);
    });
  }

}
