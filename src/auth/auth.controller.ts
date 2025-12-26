/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body()
    body: {
      username: string;
      email: string;
      password: string;
    },
  ) {
    if (!body.username || !body.email || !body.password) {
      throw new UnauthorizedException('All fields are required');
    }

    return this.authService.signup(body.username, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException();
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(
    @Body()
    body: {
      refreshToken: string;
    },
  ) {
    if (!body.refreshToken) {
      throw new UnauthorizedException('Refresh token required');
    }

    return this.authService.refreshFromToken(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    await this.authService.logout(req.user.sub);
    return { message: 'Logged out successfully' };
  }
}
