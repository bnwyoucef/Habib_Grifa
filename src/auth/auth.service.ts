import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
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
            const user = this.prisma.user.create({
                data:{
                    email: authDto.email,
                    password: hash
                }
            });
            return user;
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
            return user;
        } catch (error) {
            return error.message;
        }
    }
}
