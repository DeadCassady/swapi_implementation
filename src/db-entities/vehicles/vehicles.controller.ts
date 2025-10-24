import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, UseInterceptors, UseGuards } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './entities/vehicle.entity';
import { Roles } from '../../decorators/roles.decorator';
import { VehiclesService } from './vehicles.service';
import { Role } from '../../users/roles/roles.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { FormatInterceptor } from 'src/interceptors/format.interceptor';

@ApiTags('Vehicles')
@Controller('vehicles')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(FormatInterceptor)
@ApiBearerAuth('JWT-auth')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a Vehicle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Returns 10 entries from the vehicles repository' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a Vehicle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Vehicle identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a Vehicle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Vehicle identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Vehicle with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Vehicle identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicle })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.vehiclesService.remove(+id)
  }
}
