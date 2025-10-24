import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

@Entity()
export abstract class SwapiEntity {
  @ApiProperty({ description: 'This is the entity\'s id', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'This is the entity\'s name', nullable: false })
  @Column()
  name: string
  @ApiProperty({ description: 'This is when the character was created', nullable: true })
  @Column()
  created: Date;
  @ApiProperty({ description: 'Note identifier', nullable: true })
  @Column()
  edited: Date;
  @Expose()
  @Column({ nullable: true })
  url: string;
} 
