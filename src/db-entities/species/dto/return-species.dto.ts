import { IsString } from "class-validator";
import { CreateSpeciesDto } from "./create-species.dto";

export class ReturnSpeciesDto extends CreateSpeciesDto {
  @IsString()
  url: string
}
