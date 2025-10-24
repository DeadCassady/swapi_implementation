import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { TransformVehicleDto } from './dto/transfortm-vehicle.dto';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { getEntity } from '../global/swapi.helper';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
  ) { }

  async create(createVehicleDto: CreateVehicleDto) {
    const vehicle = new Vehicle()

    const pilots = await getEntity(this.peopleRepository, createVehicleDto.pilots)
    const films = await getEntity(this.filmsRepository, createVehicleDto.films)

    vehicle.created = new Date()
    vehicle.edited = new Date()
    try {
      Object.assign(vehicle, createVehicleDto, { pilots, films })
      return this.vehicleRepository.save(vehicle);
    } catch (error) {
      throw new InternalServerErrorException("Failed to create a new vehicle")
    }

  }

  async findAll() {
    const entities = await this.vehicleRepository.find({ relations: ['pilots', 'films'] })
    const bounds = [entities.length - 10, entities.length]
    return entities.slice(bounds[0], bounds[1])
  }

  async findOne(id: number) {
    const vehicle = await this.vehicleRepository.findOne({ where: { id }, relations: ['pilots', 'films'] });
    if (!vehicle) {
      throw new NotFoundException(`vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const obj = await this.transform(updateVehicleDto)
    try {
      await this.vehicleRepository.update(id, obj);
      return this.findOne(id);
    } catch (error) {

      throw new InternalServerErrorException(`Was not able to update the vehicle with ID ${id}`)
    }
  }

  async transform(dto: UpdateVehicleDto) {
    const vehicle = new TransformVehicleDto

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

    const people = dto.pilots?.map(async (DTO) => {
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

    Promise.all([films, people]);

    Object.assign(vehicle, dto, { pilots: people, films })
    return vehicle
  }

  async remove(id: number) {
    const result = await this.vehicleRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`vehicle with ID ${id} not found`)
    }
  }
}
