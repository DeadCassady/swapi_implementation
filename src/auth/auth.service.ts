import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  async getUsers() {
    return this.usersService.getAllUsers()
  }

  async getUser(name: string) {
    return this.usersService.findOne(name)
  }

  async promoteUser(id: number) {
    return this.usersService.makeAdmin(id)
  }

  async register(createUserDto: CreateUserDto) {
    const user = new User
    Object.assign(user, { role: 'USER' }, createUserDto)
    const newUser = await this.usersService.create(user)
    return this.validateUser(newUser)

  }

  async validateUser(payload: CreateUserDto): Promise<any> {
    const { name, password } = payload
    const user = await this.usersService.findOne(name);
    if (!user) throw new NotFoundException("User not found")
    if (user.password === password) {
      const { password, ...result } = user;
      return this.jwtService.sign(result)
    } else {
      throw new HttpException("Invalid credentials", 401)
    }
  }
}
