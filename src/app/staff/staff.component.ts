import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  @Input() staffType;
  staffClass;
  crotchetClass;

  constructor() { }

  ngOnInit() {
    this.staffClass = this.staffType === 'TREBLE' ? 'staff-bg-treble' : 'staff-bg-bass';
  }

}
