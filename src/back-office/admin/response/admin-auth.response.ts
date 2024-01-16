/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { AdminRoleEnum } from "../../../config/enum/admin/admin-role.enum";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";

export class AdminAuthResponse {
	@ApiProperty({
		type: String,
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjUxNjRiZi01MmI5LTQyN2QtOWRhNi1kN2MxYmNmNTU5YTYiLCJpYXQiOjE3MDI5NTcyODEsImV4cCI6MTcwMjk2MDg4MX0.5HhRhvbWbDfIWcfBeEh74czI6vxfOdrFIIRagExw8Bw",
	})
	token: string;

	@ApiProperty({ enum: AdminRoleEnum })
	role: string;

	constructor(data: any) {
		this.token = data?.token || "";
		this.role = data?.user?.admin_role?.role?.name || "";
	}
}

export class AdminAuthResponseSchemaSwagger {
	@ApiProperty({ type: ResponseMetaSwagger })
	meta: ResponseMetaSwagger;

	@ApiProperty({ type: AdminAuthResponse })
	data: AdminAuthResponse;
}
