import { IsNumber, IsString } from "class-validator";

export class CreateImageDto {
  @IsString()
  filename: string
  @IsString()
  originalName: string
  @IsString()
  path: string
  @IsString()
  entityType: string
  @IsNumber()
  entityId: number
}
