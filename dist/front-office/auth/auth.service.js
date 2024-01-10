"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
const typeorm_2 = require("typeorm");
const user_contact_entity_1 = require("../../database/entities/user-contact.entity");
const user_role_entity_1 = require("../../database/entities/user-role.entity");
const role_entity_1 = require("../../database/entities/role.entity");
const user_contact_provider_enum_1 = require("../../config/enum/user/user-contact-provider.enum");
const bcrypt = __importStar(require("bcryptjs"));
let AuthService = class AuthService {
    constructor(userRepository, userContactRepository, userRoleRepository, roleRepository) {
        this.userRepository = userRepository;
        this.userContactRepository = userContactRepository;
        this.userRoleRepository = userRoleRepository;
        this.roleRepository = roleRepository;
    }
    async register(registerDto) {
        return this.userRepository.manager.transaction(async (manager) => {
            try {
                const uniqueEmail = await manager.findOne(user_contact_entity_1.UserContacts, {
                    where: {
                        provider: user_contact_provider_enum_1.UserContactProviderEnum.EMAIL,
                        address: registerDto.email.toLocaleLowerCase(),
                    }
                });
                if (uniqueEmail) {
                    throw new Error("The Email Has Been Taken");
                }
                const role = await manager.findOneOrFail(role_entity_1.Roles, {
                    where: {
                        name: registerDto.role
                    }
                });
                const hashedPassword = await bcrypt.hash(registerDto.password, 10);
                const newUser = manager.create(user_entity_1.Users, {
                    username: registerDto.username,
                    password: hashedPassword,
                    login_at: new Date(),
                });
                await manager.save(user_entity_1.Users, newUser);
                const newContacts = manager.create(user_contact_entity_1.UserContacts, {
                    provider: user_contact_provider_enum_1.UserContactProviderEnum.EMAIL,
                    address: registerDto.email.toLocaleLowerCase(),
                    user: newUser,
                });
                const userRole = manager.create(user_role_entity_1.UserRoles, {
                    user: newUser,
                    role: role,
                });
                await manager.save(user_contact_entity_1.UserContacts, newContacts);
                await manager.save(user_role_entity_1.UserRoles, userRole);
                return await manager.findOneOrFail(user_entity_1.Users, {
                    where: {
                        id: newUser.id,
                    },
                    relations: ['role.role'],
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    async login(loginDto) {
        const user = await this.userContactRepository.findOne({
            where: {
                provider: user_contact_provider_enum_1.UserContactProviderEnum.EMAIL,
                address: loginDto.email.toLocaleLowerCase(),
                is_primary: true,
            },
            relations: ['user', 'user.role.role'],
        });
        if (user &&
            bcrypt.compareSync(loginDto.password, user['user'].password)) {
            return user['user'];
        }
        throw new Error('Email or Password is invalid');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(user_contact_entity_1.UserContacts)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRoles)),
    __param(3, (0, typeorm_1.InjectRepository)(role_entity_1.Roles)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map