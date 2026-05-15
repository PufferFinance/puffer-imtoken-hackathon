import { queryParams } from '../../utils/params';

describe('params', () => {
  it('should create a query string from an object', () => {
    const params = queryParams({ a: '1', b: '2' });
    expect(params).toEqual('a=1&b=2');
  });
});
