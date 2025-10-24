import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { AfterLoad, Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Film } from '../../films/entities/film.entity';
import { Person } from '../../people/entities/person.entity';
import { SwapiEntity } from 'src/db-entities/global/dto/swapi.entity';

const url = 'https://ntatarynovych.stud.shpp.me/api#/planets/'

@Entity()
export class Planet extends SwapiEntity {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  rotation_period: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  orbital_period: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  diameter: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  climate: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  gravity: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  terrain: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  surface_water: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @Column()
  population: string;
  @OneToMany(() => Person, (person: Person) => person.homeworld)
  @ApiHideProperty()
  residents?: Person[];
  @ApiProperty({ description: 'Note identifier', nullable: true })
  @ManyToMany(() => Film, (film: Film) => film.planets)
  films?: Film[];
  @ApiProperty({ description: 'Note identifier', nullable: true })
  @AfterLoad()
  generateUrl() {
    this.url = `${url}${this.id}`
  }
}
