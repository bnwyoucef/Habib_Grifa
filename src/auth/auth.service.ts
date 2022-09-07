import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,private jwt:JwtService) {}
    async createUser(authDto:AuthDto) {
        try {
            const emailExist = await this.prisma.user.findUnique({
                where: {
                    email: authDto.email
                }
            });
            if(emailExist) {
                return 'Email already exists!';
            }
            const hash = await argon.hash(authDto.password);
            const user = await this.prisma.user.create({
                data:{
                    email: authDto.email,
                    password: hash
                }
            });
            return this.signToken(user.id,user.email);
        } catch (error) {
            return error.message;
        }
    }

    async signIn(authDto: AuthDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { 
                    email: authDto.email
                }
            });
            if(!user) return 'Wrong email!'
            const checkPswrd = await argon.verify(user.password,authDto.password);
            if(!checkPswrd) return 'Wrong password!'
            delete user.password;
            return this.signToken(user.id,user.email);
        } catch (error) {
            return error.message;
        }
    }

    async signToken(
        userId: number,
        email: string,
      ): Promise<{ access_token: string }> {
        const payload = {
          sub: userId,
          email,
        };
    
        const token = await this.jwt.signAsync(
          payload,
        );
    
        return {
          access_token: token,
        };
    }
}
