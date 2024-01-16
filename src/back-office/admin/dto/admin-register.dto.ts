/** @format */

import { z } from "zod";
import { AdminRoleEnum } from "../../../config/enum/admin/admin-role.enum";

export const AdminRegisterDtoSchema = z
	.object({
		username: z.string(),
		email: z.string().email(),
		role: z.enum(Object.values(AdminRoleEnum) as [string, ...string[]]),
		password: z.string(),
		password_confirmation: z.string(),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "Password confirmation doesn't match the password",
	})
	.refine(
		(data) => {
			return (
				data.password !== undefined && data.password_confirmation !== undefined
			);
		},
		{
			message: "Password and password confirmation must both be provided",
		}
	);
export type AdminRegisterDto = z.infer<typeof AdminRegisterDtoSchema>;
