"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseDtoSchemaSwagger = exports.AuthDtoResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_account_type_enum_1 = require("../../../config/enum/user/user-account-type.enum");
const response_meta_swagger_1 = require("../../../config/swagger/response-meta.swagger");
class AuthDtoResponse {
    constructor(data) {
        var _a;
        this.token = (data === null || data === void 0 ? void 0 : data.token) || '';
        this.role = (((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.role) || []).map((item) => { var _a; return (_a = item.role) === null || _a === void 0 ? void 0 : _a.name; });
    }
}
exports.AuthDtoResponse = AuthDtoResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjUxNjRiZi01MmI5LTQyN2QtOWRhNi1kN2MxYmNmNTU5YTYiLCJpYXQiOjE3MDI5NTcyODEsImV4cCI6MTcwMjk2MDg4MX0.5HhRhvbWbDfIWcfBeEh74czI6vxfOdrFIIRagExw8Bw',
    }),
    __metadata("design:type", String)
], AuthDtoResponse.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [Object.values(user_account_type_enum_1.UserAccountTypeEnum)] }),
    __metadata("design:type", Array)
], AuthDtoResponse.prototype, "role", void 0);
class AuthResponseDtoSchemaSwagger {
}
exports.AuthResponseDtoSchemaSwagger = AuthResponseDtoSchemaSwagger;
__decorate([
    (0, swagger_1.ApiProperty)({ type: response_meta_swagger_1.ResponseMetaSwagger }),
    __metadata("design:type", response_meta_swagger_1.ResponseMetaSwagger)
], AuthResponseDtoSchemaSwagger.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: AuthDtoResponse }),
    __metadata("design:type", AuthDtoResponse)
], AuthResponseDtoSchemaSwagger.prototype, "data", void 0);
//# sourceMappingURL=auth.response.js.map