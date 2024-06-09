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
    });
    return movie;
  }

  async getMovies(query: { genre?: Genre }) {
    const movies = await this.movieRepository.find({
      where: {
        genre: query.genre,
      },
    });

    return movies;
  }

  async createMovie(movie: MovieDto) {
    const newMovie = await this.movieRepository.save(movie);
    return newMovie;
  }

  async rateMovie(id: number, rating: number) {
    const movie = await this.getMovieById(id);

    if (!movie) {
      throw new Error('Movie not found');
    }
    const updatedMovie = await this.movieRepository.update({ id }, { rating });
    return updatedMovie;
  }
}
