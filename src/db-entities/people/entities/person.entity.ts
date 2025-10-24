import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Planet } from '../../planets/entities/planet.entity';
import { Film } from '../../films/entities/film.entity';
import { Specie } from '../../species/entities/species.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Starship } from '../../starships/entities/starship.entity';
import { SwapiEntity } from 'src/db-entities/global/dto/swapi.entity';

const url = 'https://ntatarynovych.stud.shpp.me/api#/people/'

@Entity()
export class Person extends SwapiEntity {
  @ApiProperty({ description: "This is the person's height", nullable: false })
  @Column()
  height: string;
  @ApiProperty({ description: "This is the person's mass", nullable: false })
  @Column()
  mass: string;
  @ApiProperty({ description: 'This field defined the hair color', nullable: false })
  @Column()
  hair_color: string;
  @ApiProperty({ description: 'This is the scin color', nullable: false })
  @Column()
  skin_color: string;
  @ApiProperty({ description: 'This is the eye color', nullable: false })
  @Column()
  eye_color: string;
  @ApiProperty({ description: 'This is the birth year', nullable: false })
  @Column()
  birth_year: string;
  @ApiProperty({ description: 'This is the gender', nullable: false })
  @Column()
  gender: string;
  @ManyToOne(() => Planet, (planet: Planet) => planet.residents,
    { nullable: true })
  @ApiHideProperty()
  homeworld?: Planet;
  @ApiProperty({ description: 'This is the films that the person has been in', nullable: true })
  @ManyToMany(() => Film, (film: Film) => film.characters, { cascade: true, eager: true })
  films?: Film[];
  @ApiProperty({ description: 'This is the species', nullable: true })
  @ManyToMany(() => Specie, (specie: Specie) => specie.people, { cascade: true, eager: true })
  @JoinTable()
  species?: Specie[];
  @ApiProperty({ description: 'These are the vehicles', nullable: true })
  @ManyToMany(() => Vehicle, (vehicle: Vehicle) => vehicle.pilots, { cascade: true, eager: true })
  @JoinTable()
  vehicles?: Vehicle[];
  @ApiProperty({ description: 'A list of starships', nullable: true })
  @ManyToMany(() => Starship, (starship: Starship) => starship.pilots, { cascade: true, eager: true })
  @JoinTable()
  starships?: Starship[];
  @ApiProperty({ description: 'Note identifier', nullable: true })
  @AfterLoad()
  generateUrl() {
    this.url = `${url}${this.id}/`
  }
}
