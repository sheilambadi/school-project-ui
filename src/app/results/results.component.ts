import { SchoolService } from './../service/school.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public results = [];
  options: Object;
  resultData;

  constructor(private service: SchoolService) {
    this.service.getResults().subscribe((res) => {
      this.options = {
        title: { text: 'Performance per Subject', },
        series: [{
          // tslint:disable-next-line:max-line-length
          data: [res[1].english, res[1].math, res[1].kiswahili, res[1].chemistry,
          res[1].physics, res[1].biology, res[1].history, res[1].geography, res[1].cre],
          name: 'First Exam'
        }],
        xAxis: {
          categories: ['English', 'Maths', 'Kiswahili', 'Chemistry', 'Physics', 'Biology', 'History', 'Geography', 'CRE']
        },
        yAxis: {
          title: {
            text: 'Marks in %'
          }
        }
      };
    });
  }

  ngOnInit() {
    this.service.getResults().subscribe((data) => {
      this.results = data;
      this.saveData(data);
      // console.log(data);
    });
  }

  saveData(data) {
    // console.log('Data');
    this.resultData = data;
  }
}
