"use strict";
/** @format */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontOfficeModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const interceptor_provider_1 = require("../config/interceptor/interceptor.provider");
const user_profile_module_1 = require("./user-profile/user-profile.module");
const user_address_module_1 = require("./user-address/user-address.module");
const user_contact_module_1 = require("./user-contact/user-contact.module");
let FrontOfficeModule = class FrontOfficeModule {
};
exports.FrontOfficeModule = FrontOfficeModule;
exports.FrontOfficeModule = FrontOfficeModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, user_module_1.UserModule, user_profile_module_1.UserProfileModule, user_address_module_1.UserAddressModule, user_contact_module_1.UserContactModule],
        controllers: [],
        providers: [...interceptor_provider_1.InterceptorProvider],
    })
], FrontOfficeModule);
//# sourceMappingURL=front-office.module.js.map