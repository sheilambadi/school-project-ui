import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../service/school.service';
import * as XLSX from 'xlsx';
import {  saveAs } from 'file-saver';
import { Router } from '@angular/router';

type AOA = any[][];
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  admNo;
  firstName;
  lastName;
  studentBody;

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

  constructor(private service: SchoolService, private router: Router) { }

  ngOnInit() {
  }

   // tslint:disable-next-line:use-life-cycle-interface
   ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.studentBtn = document.getElementById('studentFileBtn');
  }

  addStudent() {
    this.studentBody = {
      admNo: this.admNo,
      firstName: this.firstName,
      lastName: this.lastName
    };

    this.service.postStudent(this.studentBody).subscribe(data => {
      console.log(data);
      this.router.navigate(['/students']);
    });
  }

  downloadStudentExcel() {
    this.service.downloadStudentExcel().subscribe((data) => {
      console.log(data);
      saveAs(data, 'students-list.xlsx');
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
      this.vals = ['admNo', 'firstName', 'lastName'];
      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(this.ws, { header: 1 }));
      this.jsonData = XLSX.utils.sheet_to_json(this.ws, { header: this.vals });

      this.studentBtn.addEventListener('click', () => {
        for (let i = 0; i < this.jsonData.length; i++) {
          if (i !== 0) {
            this.studentBody = {
              admNo: this.jsonData[i].admNo,
              firstName: this.jsonData[i].firstName,
              lastName: this.jsonData[i].lastName
            };
            this.service.postStudent(this.studentBody).subscribe(studentData => {
              console.log(studentData);
              this.router.navigate(['/students']);
            });
          }
        }
      });
    };
    this.reader.readAsBinaryString(target.files[0]);
  }

}
