import { Module } from '@nestjs/common';
import { UserBankService } from './user-bank.service';
import { UserBankController } from './user-bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBanks } from '../../database/entities/user-bank.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserBanks])],
  providers: [UserBankService],
  controllers: [UserBankController]
})
export class UserBankModule {}
