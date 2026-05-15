import { Pool, QueryResult, QueryResultRow } from 'pg';
import { env } from './environment';

// It's better to have a singleton instance of the database pool.
export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export abstract class DatabaseRepository {
  protected async query<R extends QueryResultRow = any>(
    query: string,
    params?: any[],
  ): Promise<QueryResult<R>> {
    const client = await pool.connect();

    try {
      return await client.query<R>(query, params);
    } finally {
      client.release();
    }
  }
}
