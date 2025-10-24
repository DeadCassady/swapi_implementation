import { PartialType } from "@nestjs/swagger";
import { Vehicle } from "../entities/vehicle.entity";

export class TransformVehicleDto extends PartialType(Vehicle) {

}

