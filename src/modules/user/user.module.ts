import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserToSocialProvider } from './user-to-social-provider.entity';
import { SocialProvider } from './social-provider.entity';

@Module({
    controllers: [UserController, AuthController],
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([User, SocialProvider, UserToSocialProvider]),
        PassportModule,
        JwtModule.register({
            secret: process.env.APP_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [UserService, AuthService, JwtStrategy],
    exports: [UserService, AuthService]
})
export class UserModule { }
