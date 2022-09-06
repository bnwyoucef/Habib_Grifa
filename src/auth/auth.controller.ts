import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('sign-up')
    createUser(@Body() authDto:AuthDto) {
        return this.authService.createUser(authDto);
    }
    @Post('sign-in')
    signIn(@Body() authDto:AuthDto) {
        return this.authService.signIn(authDto);
    }
}
