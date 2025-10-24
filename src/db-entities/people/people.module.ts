import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Specie } from '../species/entities/species.entity';
import { Film } from '../films/entities/film.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Person, Planet, Starship, Vehicle, Specie, Film])],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule { }
