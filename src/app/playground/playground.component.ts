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
  showPressedKey = false;
  pressedKey;
  keyPressClass;
  maxStreak = 0;
  maxScore = 0;
  DEFAULT_SECONDS = 60;
  secondsLeft;
  currentTimer;
  currentKeyTimeout;
  showTrainingMode = false;
  trainingMode = 'TIMED';

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

  constructor() {}

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
    this.keyPressClass = 'right';

    this.pressedKey = key.toUpperCase();
    this.showPressedKey = true;
    this.playRandomNote();

    this.currentKeyTimeout = setTimeout(() => {
      this.showPressedKey = false;
    }, 500);
  }

  handleWrong(key) {
    this.currentStreak = 0;
    this.keyPressClass = 'wrong';
    this.pressedKey = key.toUpperCase();
    this.showPressedKey = true;
    this.total++;
    this.playRandomNote();
    this.currentKeyTimeout = setTimeout(() => {
      this.showPressedKey = false;
    }, 500);
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

  startTraining() {
    this.isTrainingStarted = true;
    this.selectTrainingMode();
  }

  onSelectTrainingMode(mode) {
    this.showTrainingMode = false;
    this.trainingMode = mode;
    this.playRandomNote();
    if (this.trainingMode === 'TIMED') {
      this.startTimer();
    } else {
      this.secondsLeft = '----;';
    }
  }

  isValidKey(key) {
    const k = key.toLowerCase();
    return /[a-g]/.test(key);
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.isTrainingStarted || this.showTrainingMode) {
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
    this.isTrainingStarted = true;
    this.selectTrainingMode();
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
    },1000)
  }

  selectTrainingMode() {
    this.showTrainingMode = true;
  }

  announceScore() {
    Swal.fire({
      icon: 'success',
      title: 'Yay!',
      text: `You scored ${this.currentScore} out of ${this.total}!`
    });
  }



}