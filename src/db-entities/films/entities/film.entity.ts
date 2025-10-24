import { ApiProperty } from '@nestjs/swagger';
import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Specie } from '../../species/entities/species.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Starship } from '../../starships/entities/starship.entity';
import { Planet } from '../../planets/entities/planet.entity';
import { Person } from '../../people/entities/person.entity';
import { SwapiEntity } from 'src/db-entities/global/dto/swapi.entity';

const baseUrl = 'https://ntataryvovych.stud.shpp.me/api#/films/'

@Entity()
export class Film extends SwapiEntity {
  @ApiProperty({ description: 'This is the entity\'s name', nullable: false })
  @Column()
  title: string
  @ApiProperty({ description: "This is the film's episode id", nullable: false })
  @Column()
  episode_id: string;
  @ApiProperty({ description: "This is the film's opening crawl", nullable: false })
  @Column()
  opening_crawl: string;
  @ApiProperty({ description: 'This field defined the director', nullable: false })
  @Column()
  director: string;
  @ApiProperty({ description: 'This is the producer', nullable: false })
  @Column()
  producer: string;
  @ApiProperty({ description: 'This is the release date', nullable: false })
  @Column()
  release_date: string;
  @ApiProperty({ description: 'A list of characters in the film', nullable: false })
  @ManyToMany(() => Person, (person: Person) => person.films)
  @JoinTable()
  characters?: Person[];
  @ApiProperty({ description: 'A number of planets that appear in the movie', nullable: false })
  @ManyToMany(() => Planet, (planet: Planet) => planet.films, { cascade: true })
  @JoinTable()
  planets?: Planet[];
  @ApiProperty({ description: 'A list of starships that appear in the film', nullable: false })
  @ManyToMany(() => Starship, (starship: Starship) => starship.films, { eager: true })
  @JoinTable()
  starships?: Starship[];
  @ApiProperty({ description: 'A list of vehicles that appear in the film', nullable: false })
  @ManyToMany(() => Vehicle, (vehicle: Vehicle) => vehicle.films, { cascade: true })
  @JoinTable()
  vehicles?: Vehicle[];
  @ApiProperty({ description: 'These are the species that appear in the movie', nullable: false })
  @ManyToMany(() => Specie, (specie: Specie) => specie.films, { cascade: true })
  @JoinTable()
  species?: Specie[];
  @ApiProperty({ description: 'This is a url of the film', nullable: false })
  @AfterLoad()
  generateUrl() {
    this.url = `${baseUrl}${this.id}`
  }
}
