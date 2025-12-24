/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/users/user.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  private async signTokens(userId: string, role: string) {
    const payload = { sub: userId, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async signup(username: string, email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService['userModel'].create({
      username,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    const tokens = await this.login(user);
    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async login(user: any) {
    const tokens = await this.signTokens(user._id, user.role);
    await this.usersService.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  async refreshFromToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.refreshToken) {
        throw new ForbiddenException();
      }

      const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isValid) {
        throw new ForbiddenException();
      }

      const userIdStr = user._id.toString();

      const tokens = await this.signTokens(userIdStr, user.role);

      await this.usersService.updateRefreshToken(
        userIdStr,
        tokens.refreshToken,
      );

      return tokens;
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.usersService.clearRefreshToken(userId);
    return { success: true, message: 'Logged out successfully' };
  }
}
