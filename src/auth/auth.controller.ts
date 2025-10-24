import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RolesGuard } from "./roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/users/roles/roles.enum";

@ApiTags("Auth")
@Controller("api")
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('auth/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async login(@Body() dto: CreateUserDto) {
    return this.authService.validateUser(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Returns all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  getUsers() {
    return this.authService.getUsers();
  }

  @Get(':userName')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'userName', required: true, description: 'user id' })
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Returns a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  getProfile(@Param('userName') userName: string) {
    return this.authService.getUser(userName);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id', required: true, description: 'user id' })
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Promotes a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  promoteUser(@Param('id') id: number) {
    return this.authService.promoteUser(id);
  }
}
