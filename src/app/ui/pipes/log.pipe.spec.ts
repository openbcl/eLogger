import { TemplateTitlePipe } from './log.pipe';

describe('templateTitle', () => {
  it('create an instance', () => {
    const pipe = new TemplateTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
