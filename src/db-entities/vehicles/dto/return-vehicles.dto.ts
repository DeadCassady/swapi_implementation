import { IsString } from "class-validator";
import { CreateVehicleDto } from "./create-vehicle.dto";

export class ReturnVehicleDto extends CreateVehicleDto {
  @IsString()
  url: string
}
