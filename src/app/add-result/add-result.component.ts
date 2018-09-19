import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../service/school.service';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

type AOA = any[][];
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

  data: AOA;
  jsonData;

  reader;
  bstr: string;
  wb: XLSX.WorkBook;
  wsname: string;
  ws: XLSX.WorkSheet;
  vals;
  studentBtn;
  value1;

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

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.studentBtn = document.getElementById('studentFileBtn');
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

  downloadResultsExcel() {
    this.service.downloadResultExcel().subscribe((data) => {
      saveAs(data, 'result-list.xlsx');
    });
  }

  onFileChange(evt: any) {
    // console.log(evt);

    // Allow drag and drop
    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) {
      console.log('Cannot use multiple files');
    }

    // read the loaded file
    this.reader = new FileReader();

    this.reader.onload = (e: any) => {
      /* read workbook */
      this.bstr = e.target.result;
      this.wb = XLSX.read(this.bstr, { type: 'binary' });

      /* grab first sheet */
      this.wsname = this.wb.SheetNames[0];
      this.ws = this.wb.Sheets[this.wsname];

      // array
      // tslint:disable-next-line:max-line-length
      this.vals = ['studentId', 'examId', 'english', 'maths', 'kiswahili', 'chemistry', 'biology',
        'physics', 'history', 'geography', 'cre'];
      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(this.ws, { header: 1 }));
      this.jsonData = XLSX.utils.sheet_to_json(this.ws, { header: this.vals });

      this.studentBtn.addEventListener('click', () => {
        for (let i = 0; i < this.jsonData.length; i++) {
          if (i !== 0) {
            this.examResultsBody = {
              english: this.jsonData[i].english,
              math: this.jsonData[i].maths,
              kiswahili: this.jsonData[i].kiswahili,
              chemistry: this.jsonData[i].chemistry,
              biology: this.jsonData[i].biology,
              physics: this.jsonData[i].physics,
              history: this.jsonData[i].history,
              geography: this.jsonData[i].geography,
              cre: this.jsonData[i].cre,
              studentId: {
                id: this.jsonData[i].studentId
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
      });
    };
    this.reader.readAsBinaryString(target.files[0]);
  }


}
