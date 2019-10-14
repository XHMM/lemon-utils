import { objectToQS } from './index';

describe('utils function test', () => {
  it('convert object to querystring', () => {
    const obj = {
      id: '1',
      number: 12,
      message: '你好'
    }
    expect(objectToQS(obj)).toBe('id=1&number=12&message=%E4%BD%A0%E5%A5%BD')
  });
})