import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { Repository } from 'typeorm';
import { TransformPlanetDto } from './dto/transform-planet.dto';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { getEntity } from '../global/swapi.helper';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }

  async create(createPlanetDto: CreatePlanetDto): Promise<Planet> {
    const planet = new Planet()
    Object.assign(planet, createPlanetDto)

    const residents = await getEntity(this.peopleRepository, createPlanetDto.residents)
    const films = await getEntity(this.filmsRepository, createPlanetDto.films)

    try {
      Object.assign(planet, { residents, films })
      return this.planetsRepository.save(planet);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new planet")
    }
  }

  async findAll(): Promise<Planet[]> {
    const entities = await this.planetsRepository.find({ relations: ['residents', 'films'] })
    const bounds = [entities.length - 10, entities.length]
    return entities.slice(bounds[0], bounds[1])
  }

  async findOne(id: number): Promise<Planet> {
    const planet = await this.planetsRepository.findOne({ where: { id }, relations: ['residents', 'films'] });
    if (!planet) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
    return planet;
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
    const obj = await this.transform(updatePlanetDto)
    try {
      await this.planetsRepository.update(id, obj)
      return this.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(`Was not able to update the planet with ID ${id}`)
    }
  }


  async transform(dto: UpdatePlanetDto) {
    const planet = new TransformPlanetDto

    const people = dto.residents?.map(async (DTO) => {
      return await this.peopleRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The specie ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    const films = dto.films?.map(async (DTO) => {
      return await this.filmsRepository.findOne({
        where: { name: DTO }
      }).then((data) => {
        if (!data) {
          throw new NotFoundException(`The specie ${DTO} was not found`)
        } else {
          return data
        }
      })
    })

    Promise.all([people, films]);
    Object.assign(planet, { residents: people, films })
    return planet
  }

  async remove(id: number): Promise<void> {
    const result = await this.planetsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
  }
}
