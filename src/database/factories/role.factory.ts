import {
    Constructable,
    FactorizedAttrs,
    Factory,
  } from '@jorgebodega/typeorm-factory';
import dataSource from "../data-source";
import { Roles } from "../entities/role.entity";
import { faker } from '@faker-js/faker';
import { UserAccountTypeEnum } from '../../config/enum/user/user-account-type.enum';

export class RolesFactory extends Factory<Roles> {
    protected entity = Roles;
    protected dataSource = dataSource;
    protected attrs(): FactorizedAttrs<Roles> {
      return {
        name: faker.helpers.enumValue(UserAccountTypeEnum),
      };
    }
  }
  