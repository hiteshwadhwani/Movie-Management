import { Injectable } from '@nestjs/common';
import { Genre, MovieDto } from './movies.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { MovieSchema } from 'src/drizzle/dizzle.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class MovieService {
  constructor(private readonly dbService: DrizzleService) {}

  async getMovieById(id: string) {
    const movie = await this.dbService.getDb().query.MovieSchema.findFirst({
      where: eq(MovieSchema.id, id),
    });
    return movie;
  }

  async getMovies(query: { genre?: Genre }) {
    const movies = await this.dbService.getDb().query.MovieSchema.findMany({
      where: query.genre ? eq(MovieSchema.genre, query.genre) : undefined,
    });

    return movies;
  }

  async createMovie(movie: MovieDto) {
    // const newMovie = await this.dbService.getDb().query.MovieSchema.create({
    //   data: movie,
    // });

    const newMovie = await this.dbService
      .getDb()
      .insert(MovieSchema)
      .values({ ...movie, release_data: new Date(movie.release_data) });

    return newMovie;
  }

  async rateMovie(id: string, rating: number) {
    const movie = await this.dbService.getDb().query.MovieSchema.findFirst({
      where: eq(MovieSchema.id, id),
    });

    if (!movie) {
      throw new Error('Movie not found');
    }

    const updatedMovie = await this.dbService
      .getDb()
      .update(MovieSchema)
      .set({
        rating: rating,
      })
      .where(eq(MovieSchema.id, id));

    return updatedMovie;
  }
}
