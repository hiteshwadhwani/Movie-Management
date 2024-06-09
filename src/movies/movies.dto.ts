import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum Genre {
  action = 'action',
  comedy = 'comedy',
  drama = 'drama',
  horror = 'horror',
  romance = 'romance',
  'sci-fi' = 'sci-fi',
}

export enum Sort {
  asc = 'asc',
  desc = 'desc',
}

export const validSortingKeys = ['rating'];

export class RatingDTO {
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}

export class MovieQueryParams {
  @IsOptional()
  @IsEnum(Genre)
  genre: Genre;

  @IsOptional()
  sort: string;
}

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsISO8601()
  @IsNotEmpty()
  release_data: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(Genre)
  genre: Genre;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}
