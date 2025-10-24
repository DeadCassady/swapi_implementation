import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Role } from "../roles/roles.enum";

export class CreateUserDto {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  password: string;
  @ApiProperty({ description: 'Note identifier', nullable: false })
  @IsString()
  email: string;
}
