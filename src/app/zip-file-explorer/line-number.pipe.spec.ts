import { LineNumberPipe } from './line-number.pipe';

fdescribe('LineNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new LineNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
