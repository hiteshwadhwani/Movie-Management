import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { MovieService } from './movies.service';

@Module({
  controllers: [MoviesController],
  imports: [DrizzleModule],
  providers: [MovieService],
})
export class MoviesModule {}
