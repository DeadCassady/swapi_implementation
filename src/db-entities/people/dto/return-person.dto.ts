import { IsString } from "class-validator";
import { CreatePersonDto } from "./create-person.dto";

export class ReturnPersonDto extends CreatePersonDto {
  @IsString()
  url: string
}
