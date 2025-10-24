import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository, UpdateResult } from 'typeorm';
import { TransformPersonDto } from './dto/transform-person.dto';
import { Planet } from '../planets/entities/planet.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Specie } from '../species/entities/species.entity';
import { Film } from '../films/entities/film.entity';
import { getEntity } from '../global/swapi.helper';


@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }


  async create(createPersonDto: CreatePersonDto) {
    const person = new Person();

    const homeworld = await getEntity(this.planetRepository, createPersonDto.homeworld)
    const vehicles = await getEntity(this.vehicleRepository, createPersonDto.vehicles)
    const starships = await getEntity(this.starshipRepository, createPersonDto.starships)
    const species = await getEntity(this.speciesRepository, createPersonDto.species)
    const films = await getEntity(this.filmsRepository, createPersonDto.films)

    person.edited = new Date()
    person.created = new Date()
    try {
      Object.assign(person, createPersonDto, { homeworld, species, films, starships, vehicles })
      return this.peopleRepository.save(person);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new person")
    }
  }


  async findAll(): Promise<Person[]> {
    const entities = await this.peopleRepository.find({ relations: ['homeworld', 'vehicles', 'starships', 'species', 'films'] })
    console.log(entities[0].starships)
    const bounds = [entities.length - 10, entities.length]
    return entities.slice(bounds[0], bounds[1])
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.peopleRepository.findOne({ where: { id }, relations: ['homeworld', 'vehicles', 'starships', 'species', 'films'] });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }


  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<UpdateResult> {
    const obj = await this.transform(updatePersonDto)
    try {
      const person = await this.peopleRepository.update(id, obj);
      return person;
    } catch (error) {
      throw new InternalServerErrorException(`Was not able to update the person with ID ${id}`)
    }
  }

  async transform(dto: UpdatePersonDto) {
    const person = new TransformPersonDto

    let planet

    if (dto.homeworld) {
      planet = await getEntity(this.planetRepository, dto.homeworld)
    }

    const vehicles = dto.vehicles?.map(async (DTO) => {
      await getEntity(this.vehicleRepository, DTO)
    })

    const starships = dto.starships?.map(async (DTO) => {
      await getEntity(this.starshipRepository, DTO)
    })

    const species = dto.species?.map(async (DTO) => {
      await getEntity(this.speciesRepository, DTO)
    })

    const films = dto.films?.map(async (DTO) => {
      await getEntity(this.speciesRepository, DTO)
    })

    Promise.all([planet, films, species, vehicles, starships]);

    Object.assign(person, dto, { homeworld: planet, films, species, vehicles, starships })
    return person
  }



  async remove(id: number): Promise<void> {
    const result = await this.peopleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`person with id:${id} not found`);
    }
  }
}

