import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsString } from "class-validator";

export class CreateVehicleDto {
  @ApiProperty({ description: 'This is the name of the vehicle', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'This is the model of the vehicle', nullable: false })
  @IsString()
  model: string;
  @ApiProperty({ description: 'This is the manufacturer of the ship', nullable: false })
  @IsString()
  manufacturer: string;
  @ApiProperty({ description: 'This is the cost of the vehicle', nullable: false })
  @IsString()
  cost_in_credits: string;
  @ApiProperty({ description: 'This is the length of the vehicle', nullable: false })
  @IsString()
  length: string;
  @ApiProperty({ description: 'This is the max speed', nullable: false })
  @IsString()
  max_atmosphering_speed: string;
  @ApiProperty({ description: 'This is the number of people', nullable: false })
  @IsString()
  crew: string;
  @ApiProperty({ description: 'This is the number of passengers on the ship', nullable: false })
  @IsString()
  passengers: string;
  @ApiProperty({ description: 'This is the cargo capacity', nullable: false })
  @IsString()
  cargo_capacity: string;
  @ApiProperty({ description: `This is the number of years that the ship won't run out of the consumables`, nullable: false })
  @IsString()
  consumables: string;
  @ApiProperty({ description: 'This is the vehicle class', nullable: false })
  @IsString()
  vehicle_class: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsArray({ each: true })
  @IsString()
  pilots: string[];
  @ApiProperty({ description: 'This is the array of films', nullable: false })
  @IsArray()
  @IsString()
  films: string[];
}
