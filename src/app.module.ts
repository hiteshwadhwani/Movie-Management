import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DrizzleModule,
    MoviesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
