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
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Planet } from './entities/planet.entity';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../users/roles/roles.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { FormatInterceptor } from 'src/interceptors/format.interceptor';

@ApiTags('Planets')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(FormatInterceptor)
@ApiBearerAuth('JWT-auth')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a Planet' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns 10 entries from the planets repository' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.planetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a Planet with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.planetsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Planet with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updatePlanetDto: UpdatePlanetDto,
  ) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Planet with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.planetsService.remove(+id);
  }
}
