import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { Specie } from './entities/species.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { Planet } from '../planets/entities/planet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specie, Person, Film, Planet])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule { }
