import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-two-col-row',
  templateUrl: './two-col-row.component.html',
  styleUrls: ['./two-col-row.component.css']
})
export class TwoColRowComponent implements OnInit {

  @Input() val: string;
  @Input() label: string;

  ngOnInit() {
  }

  getLabel() {
    return this.label;
  }

  getValue() {
    return this.val;
  }

}
