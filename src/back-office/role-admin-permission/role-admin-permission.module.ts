import { Module } from '@nestjs/common';
import { RoleAdminPermissionService } from './role-admin-permission.service';
import { RoleAdminPermissionController } from './role-admin-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRoleHasPermissions } from '../../database/entities/admin-role-has-permission.entity';
import { PermissionService } from '../permission/permission.service';
import { Permissions } from '../../database/entities/permission.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AdminRoleHasPermissions,Permissions])],
  providers: [RoleAdminPermissionService,PermissionService],
  controllers: [RoleAdminPermissionController]
})
export class RoleAdminPermissionModule {}
