import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, UseInterceptors, UseGuards } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Specie } from './entities/species.entity';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../users/roles/roles.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { FormatInterceptor } from 'src/interceptors/format.interceptor';

@ApiTags('Species')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(FormatInterceptor)
@ApiBearerAuth('JWT-auth')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a Specie' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Specie })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns 10 entries from the species repository' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Specie })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.speciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a Specie with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Specie identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Specie })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.speciesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Specie with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Specie identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Specie })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateSpeciesDto: UpdateSpeciesDto,
  ) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Specie with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Specie identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Specie })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.speciesService.remove(+id)
  }
}
