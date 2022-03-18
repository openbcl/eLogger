import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  audioContext: AudioContext = new AudioContext();

  constructor() { }

  unlock() {
    if (this.audioContext.state === 'suspended') {
      const events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
      const unlock = () => {
        events.forEach(event => document.body.removeEventListener(event, unlock));
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

