"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginDtoSchema = void 0;
const zod_1 = require("zod");
exports.AuthLoginDtoSchema = zod_1.z
    .object({
    email: zod_1.z.string().email().nonempty(),
    password: zod_1.z.string().nonempty(),
});
//# sourceMappingURL=auth-login.dto.js.map