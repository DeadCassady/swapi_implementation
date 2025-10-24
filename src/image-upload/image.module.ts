import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from "./entities/image.entity";
import { ImagesController } from './image.controller';
import { ImageService } from './services/image.service';
import { FileStorage } from './services/file-storage.service';
import { ConfigModule } from '@nestjs/config';
import { Film } from '../db-entities/films/entities/film.entity';
import { Specie } from '../db-entities/species/entities/species.entity';
import { Vehicle } from '../db-entities/vehicles/entities/vehicle.entity';
import { Starship } from '../db-entities/starships/entities/starship.entity';
import { Planet } from '../db-entities/planets/entities/planet.entity';
import { Person } from '../db-entities/people/entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Person, Planet, Starship, Vehicle, Specie, Film]),
  ConfigModule.forRoot({
    envFilePath: '.env',
  })
  ],
  controllers: [ImagesController],
  providers: [ImageService, FileStorage],
})
export class ImageModule { }
