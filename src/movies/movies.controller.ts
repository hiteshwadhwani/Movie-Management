import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Query,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { MovieDto, MovieQueryParams } from './movies.dto';
import { MovieService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MovieService) {}
  @Get()
  public async getMovies(
    @Res() response: Response,
    @Query() queryParams?: MovieQueryParams,
  ) {
    const movies = await this.movieService.getMovies({
      genre: queryParams.genre,
    });
    return response.status(HttpStatus.OK).json(movies);
  }
  @Get(':id')
  public async getMovieById(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const movie = await this.movieService.getMovieById(id);
    return response.status(HttpStatus.OK).json(movie);
  }
  @Post(':id/rate')
  public rateMovie(@Param('id') id: string, @Body('rating') rating: number) {
    console.log({ id, rating });
    return 'rate movies';
  }
  @Post('create')
  public async createMovie(@Body() movie: MovieDto, @Res() response: Response) {
    const newMovie = await this.movieService.createMovie(movie);
    return response.status(HttpStatus.CREATED).json(newMovie);
  }
}
