import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../database/entities/user.entity';
import { UserContacts } from '../../database/entities/user-contact.entity';
import { Roles } from '../../database/entities/role.entity';
import { UserRoles } from '../../database/entities/user-role.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwt.strategy';
require('dotenv').config();
@Module({
  imports:[TypeOrmModule.forFeature([Users,UserContacts,Roles,UserRoles]),
  PassportModule,
  JwtModule.register({
    secret:process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService,UserService,JwtStrategy],
  controllers: [AuthController],
  exports: [TypeOrmModule]
})
export class AuthModule {}
