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
    this.service.getStudentExam(1, 2).subscribe((res) => {
      this.options = {
        title: { text: res[0].examId.examName + ' Performance' },
        series: [{
          // tslint:disable-next-line:max-line-length
          data: [res[0].english, res[0].math, res[0].kiswahili, res[0].chemistry,
          res[0].physics, res[0].biology, res[0].history, res[0].geography, res[0].cre],
          name: res[0].examId.examName
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
