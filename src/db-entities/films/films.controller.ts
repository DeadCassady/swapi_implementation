import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, UseInterceptors, UseGuards } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Film } from './entities/film.entity';
import { Public } from '../../decorators/public.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../users/roles/roles.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { FormatInterceptor } from 'src/interceptors/format.interceptor';

@ApiTags("Films")
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(FormatInterceptor)
@ApiBearerAuth('JWT-auth')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a film' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Returns 10 entries from the films repository' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.filmsService.findAll();
  }
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Returns a Film with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.USER, Role.ADMIN)
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.filmsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Film with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateFilmDto: UpdateFilmDto,
  ) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Film with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Film })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.filmsService.remove(+id)
  }
}
