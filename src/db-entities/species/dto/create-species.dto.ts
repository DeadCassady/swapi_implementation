import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsString } from "class-validator";

export class CreateSpeciesDto {
  @ApiProperty({ description: 'This is the name of the specie', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: "This is the specie's classification", nullable: false })
  @IsString()
  classification: string
  @ApiProperty({ description: 'This is the homeworld of the specie', nullable: false })
  @IsString()
  homeworld: string;
  @ApiProperty({ description: "This is the specie's language", nullable: false })
  @IsString()
  language: string;
  @ApiProperty({ description: 'The number of people of the given specie', nullable: false })
  @IsArray()
  @IsString({ each: true })
  people: string[];
  @ApiProperty({ description: 'The number of people of the given specie', nullable: false })
  @IsArray()
  @IsString({ each: true })
  films: string[];
  @ApiProperty({ description: 'This is when the this is when the entry was created', nullable: false })
  @IsDate()
  created: Date;
  @ApiProperty({ description: 'This is when the entry was changed', nullable: false })
  @IsDate()
  edited: Date;
}
