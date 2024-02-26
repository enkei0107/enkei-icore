import { Module } from '@nestjs/common';
import { UserBankService } from './user-bank.service';
import { UserBankController } from './user-bank.controller';

@Module({
  providers: [UserBankService],
  controllers: [UserBankController]
})
export class UserBankModule {}
