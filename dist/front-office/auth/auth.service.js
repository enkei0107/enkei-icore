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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
const axios_1 = __importDefault(require("axios"));
const oauth_provider_enum_1 = require("../../config/enum/auth/oauth-provider.enum");
const user_account_type_enum_1 = require("../../config/enum/user/user-account-type.enum");
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
                    },
                });
                if (uniqueEmail) {
                    throw new Error("The Email Has Been Taken");
                }
                const role = await manager.findOneOrFail(role_entity_1.Roles, {
                    where: {
                        name: registerDto.role,
                    },
                });
                const hashedPassword = await bcrypt.hash(registerDto.password, 10);
                const newUser = manager.create(user_entity_1.Users, {
                    username: await this.generatedUniqueUsername(registerDto.username),
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
                    relations: ["role.role"],
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
                is_primary: 1,
            },
            relations: ["user", "user.role.role"],
        });
        if (user && bcrypt.compareSync(loginDto.password, user["user"].password)) {
            return user["user"];
        }
        throw new Error("Email or Password is invalid");
    }
    async oauth2(oauthDto) {
        try {
            let data;
            switch (oauthDto.provider) {
                case oauth_provider_enum_1.OauthProviderEnum.GOOGLE:
                    data = await this.oauthGoogle(oauthDto.token);
                    break;
                case oauth_provider_enum_1.OauthProviderEnum.GITHUB:
                    data = await this.oauthGithub(oauthDto.token);
                    break;
                default:
                    return null;
            }
            const findUser = await this.userContactRepository.findOne({
                where: {
                    provider: user_contact_provider_enum_1.UserContactProviderEnum.EMAIL,
                    address: data.email,
                    is_primary: 1,
                },
                relations: ["user", "user.role.role"],
            });
            if (findUser) {
                return findUser["user"];
            }
            else {
                return this.userRepository.manager.transaction(async (manager) => {
                    const role = await this.roleRepository.findOneOrFail({
                        where: {
                            name: user_account_type_enum_1.UserAccountTypeEnum.BASIC,
                        },
                    });
                    const new_user = this.userRepository.create({
                        username: await this.generatedUniqueUsername(data.name),
                        avatar: data.avatar,
                        login_at: new Date(),
                    });
                    await this.userRepository.save(new_user);
                    const user_role = this.userRoleRepository.create({
                        user: new_user,
                        role: role,
                    });
                    await this.userRoleRepository.save(user_role);
                    //create user contacts
                    const user_contacts = this.userContactRepository.create({
                        provider: user_contact_provider_enum_1.UserContactProviderEnum.EMAIL,
                        address: data.email,
                        is_verified: 1,
                        user: new_user,
                    });
                    await this.userContactRepository.save(user_contacts);
                    return manager.findOneOrFail(user_entity_1.Users, {
                        where: {
                            id: new_user.id,
                        },
                        relations: ["role.role"],
                    });
                });
            }
        }
        catch (error) {
            throw error;
        }
    }
    async oauthGithub(accessToken) {
        var _a, _b, _c;
        try {
            const getEmail = await axios_1.default.get("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const getUserInfo = await axios_1.default.get("https://api.github.com/user", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return {
                email: (_a = getEmail === null || getEmail === void 0 ? void 0 : getEmail.data[0]) === null || _a === void 0 ? void 0 : _a.email.toLowerCase(),
                name: (_b = getUserInfo === null || getUserInfo === void 0 ? void 0 : getUserInfo.data) === null || _b === void 0 ? void 0 : _b.name,
                avatar: (_c = getUserInfo === null || getUserInfo === void 0 ? void 0 : getUserInfo.data) === null || _c === void 0 ? void 0 : _c.avatar_url,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async oauthGoogle(accessToken) {
        var _a, _b;
        try {
            const getUserInfo = await axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return {
                email: getUserInfo === null || getUserInfo === void 0 ? void 0 : getUserInfo.data.email.toLowerCase(),
                name: (_a = getUserInfo === null || getUserInfo === void 0 ? void 0 : getUserInfo.data) === null || _a === void 0 ? void 0 : _a.name,
                avatar: (_b = getUserInfo === null || getUserInfo === void 0 ? void 0 : getUserInfo.data) === null || _b === void 0 ? void 0 : _b.picture,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async generatedUniqueUsername(baseUsername, suffix = 1) {
        const username = suffix === 1 ? baseUsername : `${baseUsername} ${suffix}`;
        const existingUser = await this.userRepository.findOne({
            where: {
                username: username,
            },
        });
        if (existingUser) {
            return this.generatedUniqueUsername(baseUsername, suffix + 1);
        }
        return username;
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