
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUsersDto } from './dto/user_register.dto';
import { DatabaseService } from './database/database.service';
import { LoginDto } from './dto/user_login.dto'; // Make sure to import your LoginDto if you have one
import { RegisterUsersDto } from './dto/user_register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly db: DatabaseService) {}

  async login(loginDto: LoginDto): Promise<string> {
    const user = await this.validateUserCredentials(loginDto);

    if (user) {
      const token = this.jwtService.sign({ sub: user.id, username: user.username, role: user.role });
      return token;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async register(registerDto: RegisterUsersDto): Promise<string> {
    if (registerDto.role === 'admin' && registerDto.username === 'admin' && registerDto.password === 'admin123') {
      const adminUser = await this.registerAdminUser(registerDto);
      if (adminUser) {
        const token = this.jwtService.sign({ sub: adminUser.id, username: adminUser.username, role: 'admin' });
        return token;
      }
    } else {
      const user = await this.registerUser(registerDto);
      if (user) {
        const token = this.jwtService.sign({ sub: user.id, username: user.username, role: 'user' });
        return token;
      }
    }

    throw new UnauthorizedException('Invalid registration credentials');
  }

  private async validateUserCredentials(loginDto: LoginDto): Promise<any> {
    const user = await this.db.user.findUnique({
      where: {
        username: loginDto.username,
        password: loginDto.password,
      },
    });

    return user;
  }

  private async registerUser(registerDto: RegisterUsersDto): Promise<any> {
    const user = await this.db.user.create({
      data: {
        username: registerDto.username,
        password: registerDto.password,
        name: registerDto.name,
        email: registerDto.email,
        role: 'user',
      },
    });

    return user;
  }

}
