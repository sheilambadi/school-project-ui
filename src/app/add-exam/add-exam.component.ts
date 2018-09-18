import { SchoolService } from '../service/school.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {  saveAs } from 'file-saver';
import { Router } from '@angular/router';

type AOA = any[][];

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})

export class AddExamComponent implements OnInit {
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

  constructor(private service: SchoolService, private router: Router) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.examBtn = document.getElementById('examFileBtn');
  }

  addExam() {
    this.examBody = {
      examName: this.examName
    };

    // console.log(this.examBody);
    this.service.postExams(this.examBody).subscribe(data => {
      console.log(data);
      this.router.navigate(['/exams']);
    });
  }

  downloadExamExcel() {
    this.service.downloadExamExcel().subscribe((data) => {
      console.log(data);
      saveAs(data, 'exam-list.xlsx');
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
              this.router.navigate(['/exams']);
            });
          }
        }
      });
    };
    this.reader.readAsBinaryString(target.files[0]);
  }


}
