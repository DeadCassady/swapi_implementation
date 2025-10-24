
import { PartialType } from "@nestjs/swagger";
import { Starship } from "../entities/starship.entity";

export class TransformStarshipDto extends PartialType(Starship) {

}
