/** @format */
import { z } from "zod";
export declare const AuthRegisterDtoSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<[string, ...string[]]>;
    password: z.ZodString;
    password_confirmation: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username?: string;
    email?: string;
    role?: string;
    password?: string;
    password_confirmation?: string;
}, {
    username?: string;
    email?: string;
    role?: string;
    password?: string;
    password_confirmation?: string;
}>, {
    username?: string;
    email?: string;
    role?: string;
    password?: string;
    password_confirmation?: string;
}, {
    username?: string;
    email?: string;
    role?: string;
    password?: string;
    password_confirmation?: string;
}>, {
    username?: string;
    email?: string;
    role?: string;
    password?: string;
    password_confirmation?: string;
}, {
    username?: string;
    email?: string;
    role?: string;
    password?: string;
    password_confirmation?: string;
}>;
export type AuthRegisterDto = z.infer<typeof AuthRegisterDtoSchema>;
//# sourceMappingURL=auth-register.dto.d.ts.map