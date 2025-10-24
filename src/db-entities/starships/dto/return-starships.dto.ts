import { IsString } from "class-validator";
import { CreateStarshipDto } from "./create-starship.dto";

export class ReturnStarshipDto extends CreateStarshipDto {
  @IsString()
  url: string
}
