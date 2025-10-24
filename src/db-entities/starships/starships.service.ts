import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Repository } from 'typeorm';
import { TransformStarshipDto } from './dto/transform-starship.dto';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { getEntity } from '../global/swapi.helper';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }

  async create(createStarshipDto: CreateStarshipDto): Promise<Starship> {
    const starship = new Starship()

    const pilots = await getEntity(this.peopleRepository, createStarshipDto.pilots)
    const films = await getEntity(this.filmsRepository, createStarshipDto.films)

    try {
      Object.assign(starship, createStarshipDto, { pilots, films })
      return this.starshipsRepository.save(starship);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new starship")
    }
  }

  async findAll(): Promise<Starship[]> {
    const entities = await this.starshipsRepository.find({ relations: ['pilots', 'films'] })
    const bounds = [entities.length - 10, entities.length]
    return entities.slice(bounds[0], bounds[1])
  }

  async findOne(id: number): Promise<Starship> {
    const starship = await this.starshipsRepository.findOne({ where: { id }, relations: ['pilots', 'films'] });
    if (!starship) {
      throw new NotFoundException(`Starship with ID ${id} not found`);
    }
    return starship;
  }

  async update(
    id: number,
    updateStarshipDto: UpdateStarshipDto,
  ) {
    const obj = await this.transform(updateStarshipDto)
    try {
      await this.starshipsRepository.update(id, obj);
      return this.findOne(id);
    } catch (error) {

      throw new InternalServerErrorException(`Was not able to update the film with ID ${id}`)
    }
  }

  async transform(dto: UpdateStarshipDto) {
    const starship = new TransformStarshipDto

    const films = dto.films?.map(async (DTO) => {
      await getEntity(this.filmsRepository, DTO)
    })

    const people = dto.pilots?.map(async (DTO) => {
      await getEntity(this.peopleRepository, DTO)
    })

    Promise.all([films, people]);

    Object.assign(starship, dto, { pilots: people, films })
    return starship
  }

  async remove(id: number): Promise<void> {
    const result = await this.starshipsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Starship with ID ${id} not found`);
    }
  }
}
