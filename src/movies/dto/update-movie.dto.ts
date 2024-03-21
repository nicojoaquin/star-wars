import { IsString, IsDateString, IsOptional, IsArray } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Director must be a string' })
  director: string;

  @IsOptional()
  @IsString({ message: 'Producer must be a string' })
  producer: string;

  @IsOptional()
  @IsDateString({}, { message: 'Release Date must be a valid date string' })
  releaseDate: string;

  @IsOptional()
  @IsString({ message: 'Opening Crawl must be a string' })
  openingCrawl: string;

  @IsOptional()
  @IsString({ message: 'Opening Crawl must be a string' })
  url: string;

  @IsOptional()
  @IsString({ each: true, message: 'Characters must be strings' })
  @IsArray({ message: 'Characters must be an array' })
  characters: string[];

  @IsOptional()
  @IsString({ each: true, message: 'Planets must be strings' })
  @IsArray({ message: 'Planets must be an array' })
  planets: string[];

  @IsOptional()
  @IsString({ each: true, message: 'Species must be strings' })
  @IsArray({ message: 'Species must be an array' })
  species: string[];

  @IsOptional()
  @IsString({ each: true, message: 'Starships must be strings' })
  @IsArray({ message: 'Starships must be an array' })
  starships: string[];

  @IsOptional()
  @IsString({ each: true, message: 'Vehicles must be strings' })
  @IsArray({ message: 'Vehicles must be an array' })
  vehicles: string[];
}
