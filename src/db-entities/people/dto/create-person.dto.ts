import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsString } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly height: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly mass: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly hair_color: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly skin_color: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly eye_color: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly birth_year: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly gender: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  readonly homeworld: string;
  @ApiProperty({ description: 'A homeworld planet name', nullable: false })
  @IsArray()
  @IsString({ each: true })
  readonly films: string[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray()
  @IsString({ each: true })
  readonly species: string[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray()
  @IsString({ each: true })
  readonly vehicles: string[];
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray()
  @IsString({ each: true })
  readonly starships: string[];
}
