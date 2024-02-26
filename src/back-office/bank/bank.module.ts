import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banks } from '../../database/entities/bank.entity';
import { PermissionService } from '../permission/permission.service';
import { Permissions } from '../../database/entities/permission.entity';
import { AdminRoleHasPermissions } from '../../database/entities/admin-role-has-permission.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Banks,Permissions,AdminRoleHasPermissions])],
  providers: [BankService,PermissionService],
  controllers: [BankController]
})
export class BankModule {}
