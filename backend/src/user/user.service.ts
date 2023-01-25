import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import RegisterUserDto from '../auth/dto/register-user.dto';
import { User } from '../entities/user.entity';
import { Role } from '../rbac/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(registerUserDto: RegisterUserDto) {
    if (await this.findOneByName(registerUserDto.name))
      throw new BadRequestException('Имя занято');

    const user = new User(registerUserDto.name, registerUserDto.password);
    user.roles = [Role.User];

    await this.save(user);

    return user;
  }

  async findOneByName(name: string) {
    return await this.userRepository.findOneBy({ name: name });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id: id });
  }

  async save(user: User) {
    await this.userRepository.save(user);
  }
}
