"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesFactory = void 0;
const typeorm_factory_1 = require("@jorgebodega/typeorm-factory");
const data_source_1 = __importDefault(require("../data-source"));
const role_entity_1 = require("../entities/role.entity");
const faker_1 = require("@faker-js/faker");
const user_account_type_enum_1 = require("../../config/enum/user/user-account-type.enum");
class RolesFactory extends typeorm_factory_1.Factory {
    constructor() {
        super(...arguments);
        this.entity = role_entity_1.Roles;
        this.dataSource = data_source_1.default;
    }
    attrs() {
        return {
            name: faker_1.faker.helpers.enumValue(user_account_type_enum_1.UserAccountTypeEnum),
        };
    }
}
exports.RolesFactory = RolesFactory;
//# sourceMappingURL=role.factory.js.map