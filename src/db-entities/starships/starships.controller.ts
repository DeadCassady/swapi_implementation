import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Starship } from './entities/starship.entity';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../users/roles/roles.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { FormatInterceptor } from 'src/interceptors/format.interceptor';

@ApiTags('Starships')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(FormatInterceptor)
@ApiBearerAuth('JWT-auth')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a starship' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Starship,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  create(@Body() updateStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(updateStarshipDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns 10 entries from the starships repository' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Starship,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.starshipsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a starship with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Starship identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Starship,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.starshipsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a starship with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Starship identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Starship,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateStarshipDto: UpdateStarshipDto,
  ) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Starship with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Starship identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Starship,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.starshipsService.remove(+id);
  }
}
