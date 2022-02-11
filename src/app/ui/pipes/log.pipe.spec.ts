import { LogTemplateTitlePipe } from './log.pipe';

describe('logTemplateTitle', () => {
  it('create an instance', () => {
    const pipe = new LogTemplateTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
