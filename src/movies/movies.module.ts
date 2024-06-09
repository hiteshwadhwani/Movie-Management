import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MovieService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movies.entity';

@Module({
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [MovieService],
})
export class MoviesModule {}
