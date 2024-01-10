import { z } from 'zod';
export declare const AuthLoginDtoSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export type AuthLoginDto = z.infer<typeof AuthLoginDtoSchema>;
//# sourceMappingURL=auth-login.dto.d.ts.map