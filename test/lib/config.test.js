import { getEntryByDotString } from '../../lib/config';

describe('config', () => {
  test('Should grab object entry by dot.string', () => {
    const object = {
      foo: {
        bar: {
          baz: 'foo',
        },
      },
    };
    expect(getEntryByDotString(object, 'foo.bar.baz')).toEqual('foo');
    expect(getEntryByDotString(object, 'bar')).toBeUndefined();
  });
});
