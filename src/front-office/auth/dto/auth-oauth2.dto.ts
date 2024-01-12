/** @format */

import { z } from "zod";
import { OauthProviderEnum } from "../../../config/enum/auth/oauth-provider.enum";

export const AuthOauth2DtoSchema = z.object({
	provider: z.enum(Object.values(OauthProviderEnum) as [string, ...string[]]),
	token: z.string(),
});
export type AuthOauth2Dto = z.infer<typeof AuthOauth2DtoSchema>;
