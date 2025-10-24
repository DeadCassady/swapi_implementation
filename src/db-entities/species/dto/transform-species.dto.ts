
import { PartialType } from "@nestjs/swagger";
import { Specie } from "../entities/species.entity";

export class TransformSpeciesDto extends PartialType(Specie) {

}
