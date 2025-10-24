import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { Planet } from './entities/planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planet, Person, Film])],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule { }
