import { neon } from '@neondatabase/serverless';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './dizzle.schema';

@Injectable()
export class DrizzleService implements OnModuleInit {
  private db: NeonHttpDatabase<typeof schema>;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      const connectionString = this.configService.get('DATABASE_URL');
      const sql = neon(connectionString as string);
      this.db = drizzle(sql, {
        schema,
        logger: true,
      });

      console.log('Database connected successfully');
    } catch (error) {
      console.error('Failed to connect to the database', error);
      throw error;
    }
  }

  getDb() {
    return this.db;
  }
}
