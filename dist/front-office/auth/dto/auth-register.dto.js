"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRegisterDtoSchema = void 0;
const zod_1 = require("zod");
const user_account_type_enum_1 = require("../../../config/enum/user/user-account-type.enum");
exports.AuthRegisterDtoSchema = zod_1.z
    .object({
    username: zod_1.z.string().min(3).max(50).nonempty(),
    email: zod_1.z.string().email().nonempty(),
    role: zod_1.z.enum(Object.values(user_account_type_enum_1.UserAccountTypeEnum)),
    password: zod_1.z.string().nonempty(),
    password_confirmation: zod_1.z.string().nonempty(),
})
    .refine((data) => data.password === data.password_confirmation, {
    message: "Password confirmation doesn't match the password",
})
    .refine((data) => {
    return (data.password !== undefined && data.password_confirmation !== undefined);
}, {
    message: "Password and password confirmation must both be provided",
});
//# sourceMappingURL=auth-register.dto.js.map