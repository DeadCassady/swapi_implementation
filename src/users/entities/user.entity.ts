import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../roles/roles.enum";

@Entity()
export class User {
  @ApiProperty({ description: 'This is the ID', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'This is the name of the starship', nullable: false })
  @Column()
  name: string;
  @ApiProperty({ description: 'This is the name of the starship', nullable: false })
  @Column()
  password: string;
  @ApiProperty({ description: 'This is the name of the starship', nullable: false })
  @Column()
  email: string;
  @ApiProperty({ description: 'User role', nullable: false })
  @Column()
  role: Role
}
