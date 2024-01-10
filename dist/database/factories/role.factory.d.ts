import { FactorizedAttrs, Factory } from '@jorgebodega/typeorm-factory';
import { Roles } from "../entities/role.entity";
export declare class RolesFactory extends Factory<Roles> {
    protected entity: typeof Roles;
    protected dataSource: import("typeorm").DataSource;
    protected attrs(): FactorizedAttrs<Roles>;
}
//# sourceMappingURL=role.factory.d.ts.map