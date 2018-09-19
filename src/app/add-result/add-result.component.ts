import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../service/school.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {
  public exams = [];
  id;
  examId: number;
  examResultsBody;

  // subjects
  english;
  maths;
  kiswahili;
  chemistry;
  biology;
  physics;
  history;
  geography;
  cre;

  constructor(private route: ActivatedRoute, private service: SchoolService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      console.log(this.id);
    });

    this.service.getExams().subscribe(data => {
      this.exams = data;
      // console.log(data);
    });
  }

  onChange(examId) {
    this.examId = examId;
  }

  sendResults() {
    this.examResultsBody = {
      english: this.english,
      math: this.maths,
      kiswahili: this.kiswahili,
      chemistry: this.chemistry,
      biology: this.biology,
      physics: this.physics,
      history: this.history,
      geography: this.geography,
      cre: this.cre,
      studentId: {
        id: this.id
      },
      examId: {
        id: Number(this.examId)
      },
    };

    // console.log(this.examResultsBody);
    this.service.postResults(this.examResultsBody).subscribe((data) => {
      console.log('Success');
    });
  }

}
