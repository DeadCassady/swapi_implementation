import { PartialType } from "@nestjs/swagger";
import { Person } from "../entities/person.entity";

export class TransformPersonDto extends PartialType(Person) {

}
