"use strict";
/** @format */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const auth_register_dto_1 = require("./dto/auth-register.dto");
const auth_response_1 = require("./response/auth.response");
const swagger_1 = require("@nestjs/swagger");
const nestjs_zod_1 = require("nestjs-zod");
const auth_login_dto_1 = require("./dto/auth-login.dto");
const auth_oauth2_dto_1 = require("./dto/auth-oauth2.dto");
let AuthController = class AuthController {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const payload = auth_register_dto_1.AuthRegisterDtoSchema.parse(registerDto);
        try {
            const user = await this.authService.register(payload);
            const token = this.jwtService.sign({ sub: user.id });
            return new auth_response_1.AuthDtoResponse({ token, user });
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async login(loginDto) {
        const payload = auth_login_dto_1.AuthLoginDtoSchema.parse(loginDto);
        try {
            const user = await this.authService.login(payload);
            const token = this.jwtService.sign({ sub: user.id });
            return new auth_response_1.AuthDtoResponse({ token, user });
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async oauth(oauthDto) {
        const payload = auth_oauth2_dto_1.AuthOauth2DtoSchema.parse(oauthDto);
        try {
            const user = await this.authService.oauth2(payload);
            const token = this.jwtService.sign({ sub: user.id });
            return new auth_response_1.AuthDtoResponse({ token, user });
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiOperation)({ summary: "User Register" }),
    (0, swagger_1.ApiBody)({ schema: (0, nestjs_zod_1.zodToOpenAPI)(auth_register_dto_1.AuthRegisterDtoSchema) }),
    (0, swagger_1.ApiResponse)({ type: auth_response_1.AuthResponseDtoSchemaSwagger }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, swagger_1.ApiOperation)({ summary: "User login" }),
    (0, swagger_1.ApiBody)({ schema: (0, nestjs_zod_1.zodToOpenAPI)(auth_login_dto_1.AuthLoginDtoSchema) }),
    (0, swagger_1.ApiResponse)({ type: auth_response_1.AuthResponseDtoSchemaSwagger }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("oauth"),
    (0, swagger_1.ApiOperation)({ summary: "User Oauth" }),
    (0, swagger_1.ApiBody)({ schema: (0, nestjs_zod_1.zodToOpenAPI)(auth_oauth2_dto_1.AuthOauth2DtoSchema) }),
    (0, swagger_1.ApiResponse)({ type: auth_response_1.AuthResponseDtoSchemaSwagger }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "oauth", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("api/auth"),
    (0, swagger_1.ApiTags)("Front Office - Auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map