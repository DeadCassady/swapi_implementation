import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "./roles/roles.enum";


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async getAllUsers() {
    return await this.usersRepository.find()
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.findOne({
      where: [
        { name: createUserDto.name },
        { email: createUserDto.email }]
    })
    if (await user) {
      throw new ConflictException("The user already exists")
    } else {
      return this.usersRepository.save(createUserDto);
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: {
        name: username
      }
    });
    return user || undefined
  }

  async makeAdmin(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id
      }
    })

    if (!user) {
      throw new NotFoundException()
    }
    if (user.role === Role.ADMIN) {
      throw new ConflictException("The user is already an admin")
    } else {
      user.role = Role.ADMIN
      return user
    }
  }

}
