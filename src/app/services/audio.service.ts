import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioContext: AudioContext;

  constructor() { }

  unlock() {
    if (!this.audioContext || this.audioContext.state === 'suspended') {
      const events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
      const unlock = () => {
        events.forEach(event => document.body.removeEventListener(event, unlock));
        if (!this.audioContext) {
          this.audioContext = new AudioContext();
        }
        this.audioContext.resume();
      };
      events.forEach(event => document.body.addEventListener(event, unlock, false));
    }
  }

  beep() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    gainNode.gain.value = 1;
    oscillator.frequency.value = 580;
    oscillator.type = 'triangle';
    oscillator.start();
    setTimeout(() => oscillator.stop(), 100);
  }
}

