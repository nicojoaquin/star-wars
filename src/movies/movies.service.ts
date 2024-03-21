import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { MoviesApi, MoviesApiResponse } from './types/movies.types';
import { ConfigService } from '@nestjs/config';
import { FILMS_ENDPOINT } from './constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie, PrismaClient } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}
  private movieEntity: PrismaClient['movie'] = this.prisma.movie;
  private apiUrl = this.config.get('STAR_WARS_API_URL');

  async findAllFromApi(): Promise<MoviesApi[]> {
    try {
      const response: AxiosResponse<MoviesApiResponse> = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${FILMS_ENDPOINT}`),
      );
      return response.data.results;
    } catch (error) {
      throw new BadRequestException('Failed to reach API server');
    }
  }

  private formatMovie(
    apiMovie: MoviesApi,
  ): Omit<Movie, 'id' | 'createdAt' | 'updatedAt'> {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      created,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      edited,
      episode_id,
      opening_crawl,
      release_date,
      ...restMoview
    } = apiMovie;

    return {
      ...restMoview,
      episodeId: episode_id,
      openingCrawl: opening_crawl,
      releaseDate: new Date(release_date),
    };
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieEntity.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async findAll(): Promise<Movie[]> {
    return this.movieEntity.findMany();
  }

  async create({ episodeId }: CreateMovieDto) {
    const movie = await this.movieEntity.findUnique({ where: { episodeId } });
    if (movie) {
      throw new BadRequestException('There is a movie with this episode');
    }

    const apiMovies = await this.findAllFromApi();
    const apiMovie = apiMovies.find(movie => movie.episode_id === episodeId);

    if (!apiMovie) {
      throw new BadRequestException('Episode does not exist');
    }

    return this.movieEntity.create({ data: this.formatMovie(apiMovie) });
  }

  async update(dto: UpdateMovieDto, id: number) {
    const movie = await this.movieEntity.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return this.movieEntity.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.releaseDate && { releaseDate: new Date(dto.releaseDate) }),
      },
    });
  }

  async delete(id: number) {
    const movie = await this.movieEntity.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return this.movieEntity.delete({ where: { id } });
  }
}
