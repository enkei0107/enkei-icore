import { z } from "zod";

export const UserBankCreateDtoSchema = z.object({
    bank_id:z.string().uuid(),
    bank_holder: z.string(),
    bank_account_number:z.string().regex(/^[0-9]+$/,'number')
});
export type UserBankCreateDto = z.infer<typeof UserBankCreateDtoSchema>;