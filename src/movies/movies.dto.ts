import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
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

export class MovieQueryParams {
  @IsOptional()
  @IsEnum(Sort)
  sort: Sort;

  @IsOptional()
  @IsEnum(Genre)
  genre: Genre;
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
  rating: number;
}
