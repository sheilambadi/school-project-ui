import { SchoolService } from './../service/school.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { log } from 'util';

type AOA = any[][];
@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  public exams = [];
  examName;
  examBody;
  data: AOA;
  jsonData;

  reader;
  bstr: string;
  wb: XLSX.WorkBook;
  wsname: string;
  ws: XLSX.WorkSheet;
  vals;
  examBtn;

  constructor(private service: SchoolService) { }

  ngOnInit() {
    this.examBtn = document.getElementById('examFileBtn');
    // console.log('Data: ' + this.data);
    this.service.getExams().subscribe(data => {
      this.exams = data;
      console.log(data);
    });
  }

  addExam() {
    this.examBody = {
      examName: this.examName
    };

    // console.log(this.examBody);
    this.service.postExams(this.examBody).subscribe(data => {
      console.log(data);
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
      this.vals = ['examName'];
      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(this.ws, { header: 1 }));
      this.jsonData = XLSX.utils.sheet_to_json(this.ws, { header: this.vals });

      this.examBtn.addEventListener('click', () => {
        for (let i = 0; i < this.jsonData.length; i++) {
          this.examBody = {
            examName: this.jsonData[i].examName
          };

          this.service.postExams(this.examBody).subscribe(examData => {
            console.log(examData);
          });
        }
      });
    };

    // console.log(this.data);
    this.reader.readAsBinaryString(target.files[0]);
  }


  // fileData(data) {
  //   console.log(data);
  //   // for (let i = 0; i < data.length; i++) {
  //   //   this.examBody = {
  //   //     name: data
  //   //   };      // this.service.postExams(this.examBody).subscribe(exam => {
  //   //   //   console.log(exam);
  //   //   // });
  //   // }
  //   // console.log(this.examBody);
  // }

}
