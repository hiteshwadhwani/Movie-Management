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
import {
  MovieDto,
  MovieQueryParams,
  RatingDTO,
  Sort,
  validSortingKeys,
} from './movies.dto';
import { MovieService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MovieService) {}
  @Get()
  public async getMovies(
    @Res() response: Response,
    @Query() queryParams?: MovieQueryParams,
  ) {
    let sortingKey;
    let sortingDirection;
    if (queryParams.sort) {
      [sortingKey, sortingDirection] = queryParams.sort.split(':');
      if (sortingKey && !validSortingKeys.includes(sortingKey)) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Invalid sorting key',
        });
      }
      if (!sortingDirection) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Invalid sorting syntax (valid syntax - key:asc|desc )',
        });
      }
      if (sortingDirection !== Sort.asc && sortingDirection !== Sort.desc) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Invalid sorting direction' });
      }
    }
    const movies = await this.movieService.getMovies({
      genre: queryParams.genre,
      sortingKey: sortingKey,
      sortingDirection: sortingDirection,
    });
    return response.status(HttpStatus.OK).json(movies);
  }
  @Get(':id')
  public async getMovieById(
    @Param('id') id: number,
    @Res() response: Response,
  ) {
    const movie = await this.movieService.getMovieById(id);
    return response.status(HttpStatus.OK).json(movie);
  }
  @Post(':id/rate')
  public async rateMovie(
    @Param('id') id: number,
    @Body() rating: RatingDTO,
    @Res() response: Response,
  ) {
    console.log({ id, rating });
    await this.movieService.rateMovie(id, rating.rating);
    return response.status(HttpStatus.OK).json({ message: 'Movie rated' });
  }
  @Post('create')
  public async createMovie(@Body() movie: MovieDto, @Res() response: Response) {
    await this.movieService.createMovie(movie);
    return response
      .status(HttpStatus.CREATED)
      .json({ message: 'Movie created' });
  }
}
