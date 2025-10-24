import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataLoaderService } from "./data-loader.service";
import { Person } from "../db-entities/people/entities/person.entity";
import { Planet } from "../db-entities/planets/entities/planet.entity";
import { Starship } from "../db-entities/starships/entities/starship.entity";
import { Vehicle } from "../db-entities/vehicles/entities/vehicle.entity";
import { Specie } from "../db-entities/species/entities/species.entity";
import { Film } from "../db-entities/films/entities/film.entity";
import { User } from "../users/entities/user.entity";
import { PeopleService } from "src/db-entities/people/people.service";
import { VehiclesService } from "src/db-entities/vehicles/vehicles.service";
import { StarshipsService } from "src/db-entities/starships/starships.service";
import { SpeciesService } from "src/db-entities/species/species.service";
import { FilmsService } from "src/db-entities/films/films.service";
import { PlanetsService } from "src/db-entities/planets/planets.service";


@Module({
  imports: [TypeOrmModule.forFeature([Person, Planet, Starship, Vehicle, Specie, Film, User])],
  providers: [DataLoaderService, PeopleService, PlanetsService, StarshipsService, VehiclesService, SpeciesService, FilmsService],
})
export class DataLoaderModule { }
