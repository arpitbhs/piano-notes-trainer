import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  currentNote;
  currentNoteNumber = 0;
  isTrainingStarted = false;
  currentScore = 0;
  currentStreak = 0;
  total = 0;
  maxStreak = 0;
  maxScore = 0;
  DEFAULT_SECONDS = 60;
  secondsLeft;
  currentTimer;
  currentKeyTimeout;

  allNotes = [
    'TREBLE-C-1',
    'TREBLE-D-1',
    'TREBLE-E-1',
    'TREBLE-F-1',
    'TREBLE-G-1',
    'TREBLE-A-1',
    'TREBLE-B-1',
    'TREBLE-C-2',
    'TREBLE-D-2',
    'TREBLE-E-2',
    'TREBLE-F-2'
  ];

  noteTypes = [
    'C',
    'D',
    'E',
    'F',
    'G',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
  ];

  optionValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  options = [];

  constructor() {
    for (let opt of this.optionValues) {
      this.options.push({
        class: '',
        value: opt.toLowerCase()
      });
    }
  }

  ngOnInit() {}

  handleCorrect(key) {
    this.currentScore++;
    this.currentStreak++;
    if (this.currentScore > this.maxScore) {
      this.maxScore = this.currentScore;
    }
    if (this.currentStreak > this.maxStreak) {
      this.maxStreak = this.currentStreak;
    }
    this.total++;
    let matchedIndex = this.options.findIndex(opt => opt.value === key);
    this.options[matchedIndex].class = 'right';

    this.playRandomNote();

    this.currentKeyTimeout = setTimeout(() => {
      this.options[matchedIndex].class = '';
    }, 1000);

    console.log(this.options);
  }

  handleWrong(key) {
    this.currentStreak = 0;
    let matchedIndex = this.options.findIndex(opt => opt.value === key);
    this.options[matchedIndex].class = 'wrong';
    this.total++;
    this.playRandomNote();
    this.currentKeyTimeout = setTimeout(() => {
      this.options[matchedIndex].class = '';
    }, 1000);
  }

  publishNote(note) {
    this.currentNote = note;
  }

  publishNoteNumber(noteNumber) {
    this.currentNoteNumber = noteNumber;
    this.publishNote(this.allNotes[noteNumber]);
  }

  playRandomNote() {
    let selectedNoteNumber = Math.floor(Math.random() * 11);
    this.publishNoteNumber(selectedNoteNumber);
  }

  pressed(opt) {
    if (this.noteTypes[this.currentNoteNumber].toLowerCase() === opt.toLowerCase()) {
      this.handleCorrect(opt);
    } else {
      this.handleWrong(opt);
    }
  }

  startTraining() {
    let timerInterval;

    Swal.fire({
      title: 'Get Ready!!',
      html: '<div style="font-size:2rem;">Your training will start in <b>3</b> seconds</div>',
      timer: 3000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Math.floor(Swal.getTimerLeft() / 1000).toString();
            }
          }
        }, 1000)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then(() => {
      this.isTrainingStarted = true;
      this.playRandomNote();
      this.startTimer();
    });
  }

  isValidKey(key) {
    const k = key.toLowerCase();
    return /[a-g]/.test(key);
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.isTrainingStarted) {
      return;
    }
    if (!this.isValidKey(event.key)) {
      return;
    }
    clearTimeout(this.currentKeyTimeout);
    if (this.noteTypes[this.currentNoteNumber].toLowerCase() === event.key.toLowerCase()) {
      this.handleCorrect(event.key);
    } else {
      this.handleWrong(event.key);
    }
  }

  restartTraining() {
    this.resetTime();
    this.currentScore = 0;
    this.currentStreak = 0;
    clearTimeout(this.currentTimer);
    this.startTraining();
  }

  resetTime() {
    this.secondsLeft = this.DEFAULT_SECONDS;
  }

  startTimer() {
    this.resetTime();
    this.currentTimer = setInterval(() => {
      this.secondsLeft--;
      if (this.secondsLeft === 0) {
        clearInterval(this.currentTimer);
        this.announceScore();
      }
    }, 1000)
  }

  announceScore() {
    Swal.fire({
      icon: 'success',
      title: 'Yay!',
      text: `You scored ${this.currentScore} out of ${this.total}!`
    });
  }



}