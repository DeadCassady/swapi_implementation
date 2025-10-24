import { PartialType } from "@nestjs/swagger";
import { Film } from "../entities/film.entity";

export class TransformFilmDto extends PartialType(Film) {

}
