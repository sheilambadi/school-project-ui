import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../service/school.service';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.css']
})
export class StudentResultComponent implements OnInit {
  public results;
  id;
  options: Object;
  public exams = [];

  constructor(private route: ActivatedRoute, private service: SchoolService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // console.log(params);
      this.id = params.get('id');

      // this.service.getStudentResultById(this.id).subscribe(data => {
      //   this.results = data;
      //   console.log(data);
      // });

      this.service.getStudentExam(this.id, 1).subscribe((res) => {
        this.results = res;
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
    });

    this.service.getExams().subscribe(data => {
      this.exams = data;
      console.log(data);
    });
  }

  onChange(examId) {
    this.service.getStudentExam(this.id, examId).subscribe((res) => {
      console.log('Exam id' + examId);
      this.results = res;
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

}
