import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role } from 'src/auth/decorators/role.decorator';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Role('REGULAR')
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @Public()
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Role('ADMIN')
  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }

  @Role('ADMIN')
  @Put('/:id')
  update(@Body() dto: UpdateMovieDto, @Param('id', ParseIntPipe) id: number) {
    return this.moviesService.update(dto, id);
  }

  @Role('ADMIN')
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.delete(id);
  }
}
