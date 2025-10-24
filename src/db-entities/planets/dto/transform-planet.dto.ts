import { PartialType } from "@nestjs/swagger";
import { Planet } from "../entities/planet.entity";

export class TransformPlanetDto extends PartialType(Planet) {

}
