import {
  Injectable,
  Inject,
  OnModuleDestroy,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { Pool } from 'pg';
import { cwd } from 'process';
import postgrasErrorObjectReturner, {
  PostgresErrorField,
} from './types/postgresError.type';

@Injectable()
export class DbconfigService implements OnModuleDestroy {
  private readonly logger = new Logger(DbconfigService.name);
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async onModuleInit() {
    try {
      // console.log('file location', cwd());
      const client = await this.pool.connect();
      await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
      await client.query(
        `DO $$
          BEGIN
              IF NOT EXISTS (
                  SELECT 1 FROM pg_type WHERE typname = 'auth_provider'
              ) THEN
                  CREATE TYPE auth_provider AS ENUM ('credentials', 'google', 'facebook', 'github');
              END IF;
          END
          $$;`,
      );

      // const cc = await this.query('create.user.sql', [
      //   'sharif67',
      //   'credentials',
      //   'password',
      //   'srka780@gmail.com',
      // ]);

      this.logger.log('Database connected successfully ✅');
      client.release();
    } catch (e) {
      console.log(e);
      this.logger.log(`Error connecting to DB-user ❌`);
      console.log('Error connecting to DB-user ❌');
    }
  }

  async query(fileName: string, params?: any[]) {
    try {
      await this.createTable('create.user.table.sql'); // Ensure table exists before query
      await this.createTable('create.email.table.sql'); // Ensure table exists before query

      const sql = await this.sqlPath(fileName);
      const result = await this.pool.query(sql, params);
      this.logger.log(`Executed query from ${fileName}`);
      return result.rows.length ? result.rows : null;
    } catch (e) {
      // console.log(e);
      this.sqlException(e as Error);
      return null;
    }
  }

  async rawQuery(qurey: string, params?: any[]) {
    try {
      await this.createTable('create.user.table.sql'); // Ensure table exists before query
      await this.createTable('create.email.table.sql'); // Ensure table exists before query

      const result = await this.pool.query(qurey, params);
      this.logger.log(`Executed query from ${qurey}`);
      return result.rows.length ? result.rows : null;
    } catch (e) {
      // console.log(e);
      this.sqlException(e as Error);
      return null;
    }
  }

  private sqlException(e: Error) {
    const postgresError = postgrasErrorObjectReturner(e);
    if (
      postgresError &&
      typeof postgresError === 'object' &&
      PostgresErrorField.CODE in postgresError &&
      PostgresErrorField.SEVERITY in postgresError
    ) {
      switch (postgresError.code) {
        case '23505':
          this.logger.log(
            `database error: this ${this.parseUniqueConstraint(postgresError.detail as string)} already exists`,
          );
          throw new ConflictException(
            `this ${this.parseUniqueConstraint(postgresError.detail as string)} already exists`,
          );
        default:
          this.logger.log('Unknown database error', e.message);
          throw new InternalServerErrorException(
            `Database error occurred: ${e.message} :
            ${postgresError.severity} - Code: ${postgresError.code} - Detail:  ${this.parseUniqueConstraint(postgresError.detail as string)}`,
          );
      }
    }
    this.logger.log(`Unknown database error ---- ${e.name}`, e.message);
    throw new InternalServerErrorException();
  }

  private parseUniqueConstraint(detail: string): string | null {
    const match = detail.match(/\(([^)]+)\)=\(([^)]+)\)/);
    if (!match) return null;
    const [, field] = match;
    return field;
  }

  private async createTable(fileName: string): Promise<void> {
    const sqlfile = await this.sqlPath(fileName);
    await this.pool.query(sqlfile);
  }

  private async sqlPath(fileName: string) {
    const path = join(cwd(), 'sql', fileName);
    const sqlfile = await readFile(path, 'utf8');
    return sqlfile;
  }

  async onModuleDestroy() {
    try {
      await this.pool.end();
      this.logger.log('Postgres pool closed.');
    } catch (e) {
      this.logger.error('Error closing Postgres pool', e);
      console.error('onModuleDestroy to connect to the database ❌', e);
      await this.pool.end();
    }
  }
}
