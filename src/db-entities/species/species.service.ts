import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Specie } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransformSpeciesDto } from './dto/transform-species.dto';
import { Planet } from '../planets/entities/planet.entity';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { getEntity } from '../global/swapi.helper';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Specie)
    private speciesRepository: Repository<Specie>,
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }

  async create(createSpeciesDto: CreateSpeciesDto) {
    const specie = new Specie()

    const homeworld = await getEntity(this.planetsRepository, createSpeciesDto.homeworld)
    const people = await getEntity(this.peopleRepository, createSpeciesDto.people)
    const films = await getEntity(this.filmsRepository, createSpeciesDto.films)

    specie.edited = new Date()
    specie.created = new Date()
    try {
      Object.assign(specie, createSpeciesDto, { homeworld, people, films })
      return this.speciesRepository.save(specie);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new starship")
    }
  }

  async findAll() {
    const entities = await this.speciesRepository.find({ relations: ['homeworld', 'people', 'films'] })
    const bounds = [entities.length - 10, entities.length]
    return entities.slice(bounds[0], bounds[1])
  }

  async findOne(id: number) {
    const specie = await this.speciesRepository.findOne({ where: { id }, relations: ['homeworld', 'residents', 'films'] });
    if (!specie) {
      throw new NotFoundException(`specie with ID ${id} not found`);
    }
    return specie;
  }

  async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    const obj = await this.transform(updateSpeciesDto)
    try {
      await this.speciesRepository.update(id, obj);
      return this.findOne(id);
    } catch (error) {

      throw new InternalServerErrorException(`Was not able to update the specie with ID ${id}`)
    }
  }

  async transform(dto: UpdateSpeciesDto) {
    const specie = new TransformSpeciesDto

    let planet

    if (dto.homeworld) {
      planet = await getEntity(this.planetsRepository, dto.homeworld)
    }

    const films = dto.films?.map(async (DTO) => {
      await getEntity(this.filmsRepository, DTO)
    })

    const people = dto.people?.map(async (DTO) => {
      await getEntity(this.peopleRepository, DTO)
    })

    Promise.all([films, people, planet]);

    Object.assign(specie, dto, { residents: people, homeworld: planet, films })
    return specie
  }

  async remove(id: number): Promise<void> {
    const result = await this.speciesRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Specie with ID ${id} not found`)
    }
  }
}
