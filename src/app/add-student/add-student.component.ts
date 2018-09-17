import { SchoolService } from './../service/school.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
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
  value1;

  constructor(private service: SchoolService) { }

  ngOnInit() {
    this.examBtn = document.getElementById('examFileBtn');
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
          if (i !== 0) {
            this.examBody = {
              examName: this.jsonData[i].examName
            };
            this.service.postExams(this.examBody).subscribe(examData => {
              console.log(examData);
            });
          }
        }
      });
    };
    this.reader.readAsBinaryString(target.files[0]);
  }

}
