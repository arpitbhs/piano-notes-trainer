import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crotchet',
  templateUrl: './crotchet.component.html',
  styleUrls: ['./crotchet.component.scss']
})
export class CrotchetComponent implements OnInit {

  @Input() note;
  currentClass;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.note) {
      return this.currentClass = 'hide';
    }
    this.currentClass = this.getClassName(this.note);
  }

  getClassName(note: string) {
    return note.toLowerCase();
  }


}
