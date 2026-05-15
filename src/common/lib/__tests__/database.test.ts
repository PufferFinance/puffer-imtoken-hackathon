import { DatabaseRepository, pool } from '../database';

describe('database', () => {
  class ExampleRepository extends DatabaseRepository {
    public async getUser(email: string) {
      return this.query('SELECT * FROM users WHERE email = $1', [email]);
    }
  }

  it('should use the pool to query the database', async () => {
    // Given
    const mockClient = {
      query: jest
        .fn()
        .mockResolvedValue({ rows: [{ email: 'test@example.com' }] }),
      release: jest.fn(),
    };
    // `jest.spyOn` gives a type error, so we use a mock implementation.
    pool.connect = jest.fn().mockResolvedValue(mockClient);

    // When
    const repo = new ExampleRepository();
    const result = await repo.getUser('test@example.com');

    // Then
    expect(result.rows[0].email).toEqual('test@example.com');
    expect(mockClient.query).toHaveBeenCalled();
    expect(mockClient.release).toHaveBeenCalled();
  });
});
