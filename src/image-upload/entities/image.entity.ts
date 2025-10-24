import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Image {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  filename: string
  @ApiProperty()
  @Column()
  originalName: string
  @ApiProperty()
  @Column()
  path: string
  @ApiProperty()
  @Column()
  entityId: string
  @ApiProperty()
  @Column()
  entityType: string
  @ApiProperty()
  @Column()
  created: Date;
  @ApiProperty()
  @Column()
  edited: Date;
}
