import { Component, OnInit } from '@angular/core';
import { trigger, transition, sequence, animate, style } from '@angular/animations';
import * as $ from 'jquery';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('rowsAnimation', [
      transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-650px)', 'box-shadow': 'none' }),
        sequence([
          animate(".60s ease", style({ height: '*', opacity: '.4', transform: 'translateX(0)', 'box-shadow': 'none' })),
          animate(".60s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ])
  ],
})
export class ListComponent implements OnInit {

  ngOnInit() {
  }

  // displayedColumns = ['Sno', 'Name', 'TextRule', 'Rule1', 'Rule2'];
  displayedColumns = [];
  dataSource: MatTableDataSource<object>;
  countRows: number = 0;
  loadCount: number = 0;
  headersToDisplay = [
    "PO file",
    "name",
    "limit",
    "amount",
    "approval amount"
  ];
  dataToLoad = [
    [
      "9002",
      "Irene Ligoe",
      "100000",
      "55000",
      true
    ],
    [
      "9002",
      "Irene Ligoe",
      "25000",
      "55000",
      false
    ],
    [
      "9004",
      "Wallis Tommis",
      "25000",
      "20000",
      true
    ],
    [
      "9005",
      "Portie Deeley",
      "25000",
      "15000",
      true
    ],
    [
      "9007",
      "Cati Enterlein",
      "10000",
      "4500",
      true
    ],
    [
      "9007",
      "Cati Enterlein",
      "10000",
      "4500",
      true
    ],
    [
      null,
      null,
      null,
      null,
      false
    ]
  ];

  constructor() {
    const users: object[] = [];
    this.dataSource = new MatTableDataSource(users);
  }
  handleOneTime = 0
  LoadData() {
    for (let j = 0; j < this.headersToDisplay.length; j++) {
      this.displayedColumns.push(this.headersToDisplay[j]);
    }
    // return;

    setTimeout(() => {
      this.StartLoadData();
    }, 1000);
  }
  StartLoadData() {
    this.loadCount = 0;
    this.countRows++;
    let i = this.countRows;
    if (this.dataToLoad.length > i) {
      this.dataSource['data'].push(this.getRandomUser(i));
      this.dataSource.filter = "";
      setTimeout(() => {
        this.StartLoadData();
      }, 1000);
    }

    // setTimeout(() => {
    //   this.toggleLoaders("Rule1_" + i, this.dataSource['data'][i - 1].Rule1);
    // }, this.RandomNumber(1500, 3500));
    // setTimeout(() => {
    //   this.toggleLoaders("Rule2_" + i, this.dataSource['data'][i - 1].Rule2);
    // }, this.RandomNumber(1500, 3500));
  }
  getRandomUser(i) {
    // let _Rule1DivId = "Rule1_" + i;
    // let _Rule2DivId = "Rule2_" + i;

    let obj = {};
    for (let j = 0; j < this.displayedColumns.length; j++) {
      obj[this.displayedColumns[j]] = this.dataToLoad[i][j];
    }
    obj["id"] = i.toString();
    return obj;
    // return {
    //   id: i.toString(),
    //   Sno: i,
    //   Name: NAMES[Math.floor(Math.random() * NAMES.length)],
    //   Rule1DivId: _Rule1DivId,
    //   Rule2DivId: _Rule2DivId,
    //   TextTicker: TextSentences[Math.floor(Math.random() * TextSentences.length)],
    //   Rule1: (Math.random() >= 0.5),
    //   Rule2: (Math.random() >= 0.5),
    // };
  }
  RandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  toggleLoaders(RuleDivId, IsSuccess) {
    if (IsSuccess) {
      $('#' + RuleDivId).addClass('circle-loader').addClass('load-complete');
      $('#' + RuleDivId + ' div').addClass("checkmark").addClass("draw");
    } else {
      $('#' + RuleDivId).removeClass('circle-loader').addClass('circle-loader2').addClass('load-error2');
      $('#' + RuleDivId + ' div').addClass("checkmark2").addClass("error2");
    }
    this.loadCount++;
    if (this.countRows < 50 && this.loadCount == 2)
      this.StartLoadData();
  }

}

const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

const TextSentences = ['Open the door', 'Cloth is wet',
  'flour is well mixed', 'tipu is calling back',
  'we got the winner', 'I may see you soon'];

export interface UserData {
  id: string;
  Sno: number;
  Name: string;
  TextTicker: string;
  Rule1: boolean;
  Rule2: boolean;
  Rule1DivId: string;
  Rule2DivId: string;
}



