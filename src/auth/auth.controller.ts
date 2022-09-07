import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtGuard } from './guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('sign-up')
    createUser(@Body() authDto:AuthDto) {
        return this.authService.createUser(authDto);
    }
    @UseGuards(JwtGuard)
    @Post('sign-in')
    signIn(@Body() authDto:AuthDto) {
        return this.authService.signIn(authDto);
    }
}
