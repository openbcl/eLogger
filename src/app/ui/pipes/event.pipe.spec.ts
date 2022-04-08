import { EventLabelPipe } from './event.pipe';

describe('eventLabelPipePipe', () => {
  it('create an instance', () => {
    const pipe = new EventLabelPipe();
    expect(pipe).toBeTruthy();
  });
});
