import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Planet } from '../../planets/entities/planet.entity';
import { Person } from '../../people/entities/person.entity';
import { Film } from '../../films/entities/film.entity';
import { SwapiEntity } from 'src/db-entities/global/dto/swapi.entity';

const url = 'https://ntatarynovych.stud.shpp.me/api#/species/'

@Entity()
export class Specie extends SwapiEntity {
  @ApiProperty({ description: "This is the specie's classification", nullable: false })
  @Column()
  classification: string
  @ApiHideProperty()
  @ManyToOne(() => Planet, { nullable: true, eager: true })
  @JoinColumn()
  homeworld?: Planet
  @ApiProperty({ description: "This is the specie's language", nullable: false })
  @Column()
  language: string;
  @ApiProperty({ description: 'The number of people of the given specie', nullable: false })
  @ManyToMany(() => Person, (person: Person) => person.species)
  people?: Person[];
  @ApiProperty({ description: 'The number of people of the given specie', nullable: false })
  @ManyToMany(() => Film, (film: Film) => film.species)
  films?: Film[];
  @ApiProperty({ description: 'This is a url of the film', nullable: false })
  @AfterLoad()
  generateUrl() {
    this.url = `${url}${this.id}`
  }
}
