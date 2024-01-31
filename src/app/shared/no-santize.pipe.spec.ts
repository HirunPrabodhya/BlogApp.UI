import { NoSantizePipe } from './no-santize.pipe';

describe('NoSantizePipe', () => {
  it('create an instance', () => {
    const pipe = new NoSantizePipe();
    expect(pipe).toBeTruthy();
  });
});
