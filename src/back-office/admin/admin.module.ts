import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Admins } from '../../database/entities/admin.entity';
import { AdminContacts } from '../../database/entities/admin-contact.entity';
import { RoleAdmins } from '../../database/entities/role-admin.entity';
import { AdminRoles } from '../../database/entities/admin-role.entity';
import { AdminJwtStrategy } from './admin.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admins, AdminContacts, RoleAdmins, AdminRoles]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_TTL },
    }),
  ],
  providers: [AdminService,AdminJwtStrategy],
  controllers: [AdminController]
})
export class AdminModule {}
