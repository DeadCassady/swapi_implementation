import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToMany,
  AfterLoad,
} from 'typeorm';
import { Film } from '../../films/entities/film.entity';
import { Person } from '../../people/entities/person.entity';
import { SwapiEntity } from 'src/db-entities/global/dto/swapi.entity';

const url = 'https://ntatarynovych.stud.shpp.me/api#/vehicles/'

@Entity()
export class Vehicle extends SwapiEntity {
  @ApiProperty({ description: 'This is the model of the vehicle', nullable: false })
  @Column()
  model: string;
  @ApiProperty({ description: 'This is the manufacturer of the ship', nullable: false })
  @Column()
  manufacturer: string;
  @ApiProperty({ description: 'This is the cost of the vehicle', nullable: false })
  @Column()
  cost_in_credits: string;
  @ApiProperty({ description: 'This is the length of the vehicle', nullable: false })
  @Column()
  length: string;
  @ApiProperty({ description: 'This is the max speed', nullable: false })
  @Column()
  max_atmosphering_speed: string;
  @ApiProperty({ description: 'This is the number of people', nullable: false })
  @Column()
  crew: string;
  @ApiProperty({ description: 'This is the number of passengers on the ship', nullable: false })
  @Column()
  passengers: string;
  @ApiProperty({ description: 'This is the cargo capacity', nullable: false })
  @Column()
  cargo_capacity: string;
  @ApiProperty({ description: `This is the number of years that the ship won't run out of the consumables`, nullable: false })
  @Column()
  consumables: string;
  @ApiProperty({ description: 'This is the vehicle class', nullable: false })
  @Column()
  vehicle_class: string;
  @ApiProperty({ description: 'Note identifier', nullable: true })
  @ManyToMany(() => Person, (person: Person) => person.vehicles)
  pilots?: Person[];
  @ApiProperty({ description: 'This is the array of films', nullable: true })
  @ManyToMany(() => Film, (film) => film.vehicles)
  films?: Film[];
  @ApiProperty({ description: 'This is the url of the vehicle', nullable: true })
  @AfterLoad()
  generateUrl() {
    this.url = `${url}${this.id}`
  }
}
