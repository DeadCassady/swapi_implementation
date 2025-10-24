import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsString } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly rotation_period: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly orbital_period: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly diameter: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly climate: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly gravity: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly terrain: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly surface_water: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly population: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray()
  @IsString({ each: true })
  readonly residents: string[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray()
  @IsString({ each: true })
  readonly films: string[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsDate()
  readonly created: Date;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsDate()
  readonly edited: Date;
}
