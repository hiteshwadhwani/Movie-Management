import { Injectable } from '@nestjs/common';
import { Genre, MovieDto } from './movies.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './movies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async getMovieById(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      select: {
        id: true,
        title: true,
        release_data: true,
        description: true,
        genre: true,
        rating: true,
      },
    });
    return movie;
  }

  async getMovies(query: {
    genre?: Genre;
    sortingKey: number;
    sortingDirection: string;
  }) {
    const movies = await this.movieRepository.find({
      where: {
        genre: query.genre,
      },
      order: {
        [query.sortingKey]: query.sortingDirection,
      },
      select: {
        id: true,
        title: true,
        release_data: true,
        description: true,
        genre: true,
        rating: true,
      },
    });

    return movies;
  }

  async createMovie(movie: MovieDto) {
    const newMovie = await this.movieRepository.insert(movie);
    return newMovie;
  }

  async rateMovie(id: number, rating: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new Error('Movie not found');
    }

    const updateMovie = await this.movieRepository.update(
      { id },
      {
        rating_count: movie.rating_count + 1,
        rating_sum: movie.rating_sum + rating,
        rating: Math.round(
          (movie.rating_sum + rating) / (movie.rating_count + 1),
        ),
      },
    );

    return updateMovie;
  }
}
