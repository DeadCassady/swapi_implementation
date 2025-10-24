import { IsString } from "class-validator";
import { CreatePlanetDto } from "./create-planet.dto";

export class ReturnPlanetDto extends CreatePlanetDto {
  @IsString()
  url: string
}
