import { EventTypeTextPipe } from './event.pipe';

describe('EventTypeTextPipe', () => {
  it('create an instance', () => {
    const pipe = new EventTypeTextPipe();
    expect(pipe).toBeTruthy();
  });
});
