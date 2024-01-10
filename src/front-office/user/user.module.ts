import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../database/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
