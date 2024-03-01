import { z } from "zod";

export const UserBankUpdateDtoSchema = z.object({
    bank_id:z.string().uuid().optional(),
    bank_holder: z.string().optional(),
    bank_account_number:z.string().regex(/^[0-9]+$/,'number').optional(),
    is_primary:z.number().min(1).max(1).optional()
});
export type UserBankUpdateDto = z.infer<typeof UserBankUpdateDtoSchema>;