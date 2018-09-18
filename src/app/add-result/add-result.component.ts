import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {
  options: Object;
  constructor() {
    this.options = {
      title : { text : 'simple chart' },
      series: [{
          data: [29.9, 71.5, 106.4, 129.2],
      }],
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges', 'Pines']
    }
  };
  }

  ngOnInit() {
  }

}
