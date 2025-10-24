import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransformFilmDto } from './dto/transform-film.dto';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Specie } from '../species/entities/species.entity';
import { getEntity } from '../global/swapi.helper';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,

    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
  ) { }


  async create(createFilmDto: CreateFilmDto) {
    const film = new Film();

    const characters = await getEntity(this.peopleRepository, createFilmDto.characters)
    const vehicles = await getEntity(this.vehicleRepository, createFilmDto.vehicles)
    const starships = await getEntity(this.starshipRepository, createFilmDto.starships)
    const species = await getEntity(this.speciesRepository, createFilmDto.species)
    const planets = await getEntity(this.planetsRepository, createFilmDto.planets)
    film.created = new Date()
    film.edited = new Date()
    film.name = createFilmDto.title
    try {
      Object.assign(film, createFilmDto, { planets, vehicles, starships, species, characters })
      return await this.filmsRepository.save(film);

    } catch (error) {
      console.log(error)
      // throw new InternalServerErrorException("Failed to create a new film")
    }
  }

  async findAll() {
    const entities = await this.filmsRepository.find({ relations: ['characters', 'vehicles', 'starships', 'species', 'planets'] })
    const bounds = [entities.length - 10, entities.length]
    return entities.slice(bounds[0], bounds[1])
  }

  async findOne(id: number): Promise<Film> {
    const film = await this.filmsRepository.findOne({ where: { id }, relations: ['characters', 'vehicles', 'starships', 'species', 'planets'] });
    if (!film) {
      throw new NotFoundException(`film with ID ${id} not found`);
    }
    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const obj = await this.transform(updateFilmDto)
    try {
      return await this.filmsRepository.update(id, obj);
    } catch (error) {

      throw new InternalServerErrorException(`Was not able to update the film with ID ${id}`)
    }
  }

  private async transform(dto: UpdateFilmDto) {
    const film = new TransformFilmDto
    const planets = dto.planets?.map(async (DTO) => {
      return await this.planetsRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The planet ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    const vehicles = dto.vehicles?.map(async (DTO) => {
      return await this.vehicleRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The vehicle ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    const starships = dto.starships?.map(async (DTO) => {
      return await this.starshipRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The starship ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    const species = dto.species?.map(async (DTO) => {
      return await this.speciesRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The specie ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    const people = dto.characters?.map(async (DTO) => {
      return await this.peopleRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The person ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    Promise.all([planets, people, species, vehicles, starships]);

    Object.assign(film, dto, { characters: people, planets, starships, species, vehicles })
    return film
  }

  async remove(id: number): Promise<void> {
    const result = await this.peopleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`film with ID ${id} not found`)
    }
  }
}
