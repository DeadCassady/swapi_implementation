import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Person, Film])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule { }
