import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateFilmDto {
  @ApiProperty({ description: 'This is the title of the film', nullable: false })
  @IsString()
  title: string;
  @ApiProperty({ description: "This is the film's episode id", nullable: false })
  @IsString()
  episode_id: string;
  @ApiProperty({ description: "This is the film's opening crawl", nullable: false })
  @IsString()
  opening_crawl: string;
  @ApiProperty({ description: 'This field defined the director', nullable: false })
  @IsString()
  director: string;
  @ApiProperty({ description: 'This is the producer', nullable: false })
  @IsString()
  producer: string;
  @ApiProperty({ description: 'This is the release date', nullable: false })
  @IsString()
  release_date: string;
  @ApiProperty({ description: 'A list of characters in the film', nullable: false })
  @IsArray()
  @IsString()
  characters: string[];
  @ApiProperty({ description: 'A number of planets that appear in the movie', nullable: false })
  @IsArray()
  @IsString()
  planets: string[];
  @ApiProperty({ description: 'A list of starships that appear in the film', nullable: false })
  @IsArray()
  @IsString()
  starships: string[];
  @ApiProperty({ description: 'A list of vehicles that appear in the film', nullable: false })
  @IsArray()
  @IsString()
  vehicles: string[];
  @ApiProperty({ description: 'These are the species that appear in the movie', nullable: false })
  @IsArray()
  @IsString()
  species: string[];
}
