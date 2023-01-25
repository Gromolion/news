import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import RegisterUserDto from './dto/register-user.dto';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const hashedPassword = await hash(
      registerUserDto.password,
      parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS),
    );

    return await this.userService.createUser({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findOneByName(name);

    if (user && (await compare(password, user.password))) {
      return user;
    }
    return false;
  }

  async login(user: User) {
    const payload = { name: user.name, sub: user.id, roles: user.roles };
    return {
      id: user.id,
      name: user.name,
      access_token: this.jwtService.sign(payload),
    };
  }
}
