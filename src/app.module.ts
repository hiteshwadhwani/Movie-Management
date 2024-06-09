import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import 'reflect-metadata';
import { DbServiceModule } from './dbService/dbService.module';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DbServiceModule,
  ],
})
export class AppModule {}
