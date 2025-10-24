import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsString } from 'class-validator';

export class CreateStarshipDto {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  model: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  manufacturer: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  cost_in_credits: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  length: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  max_atmosphering_speed: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  crew: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  passengers: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  cargo_capacity: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  consumables: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  hyperdrive_rating: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  MGLT: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  starship_class: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray()
  @IsString()
  pilots: string[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray()
  @IsString({ each: true })
  films: string[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsDate()
  created: Date;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsDate()
  edited: Date;
}
