/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { Admins } from "../../../database/entities/admin.entity";
import { AdminContactProviderEnum } from "../../../config/enum/admin/admin-contact-provider.enum";
import { AdminContacts } from "../../../database/entities/admin-contact.entity";
import { ResponsePaginate } from "../../../config/response/response.paginate";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";
export class AdminContactResponse {
	@ApiProperty({ format: "uuid" })
	id: string;

	@ApiProperty({ enum: AdminContactProviderEnum })
	provider: string;

	@ApiProperty()
	is_primary: number;

	@ApiProperty()
	is_verified: number;

	@ApiProperty()
	created_at: Date;

	@ApiProperty()
	updated_at: Date;

	constructor(data: AdminContacts) {
		this.id = data?.id ?? "";
		this.provider = data?.provider ?? "";
		this.is_primary = data?.is_primary;
		this.is_verified = data?.is_verified;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
	}
}
export class AdminItemResponse {
	@ApiProperty({ format: "uuid" })
	id: string;

	@ApiProperty()
	role: string;

	@ApiProperty()
	username: string;

	@ApiProperty({ format: "url" })
	avatar: string;

	@ApiProperty({ minimum: 0, maximum: 1 })
	is_active: number;

	@ApiProperty({ type: [AdminContactResponse] })
	contacts: AdminContactResponse[];

	@ApiProperty()
	created_at: Date;

	@ApiProperty()
	updated_at: Date;

	constructor(data: Admins) {
		this.id = data?.id || "";
		this.role = data?.admin_role?.role?.name || "";
		this.username = data?.username || "";
		this.avatar = data?.avatar || "";
		this.is_active = data?.is_active || 0;
		this.contacts = data?.contacts
			? data?.contacts.map(
					(item: AdminContacts) => new AdminContactResponse(item)
			  )
			: [];
		this.created_at = data?.created_at;
		this.updated_at = data?.updated_at;
	}
}

export class AdminPaginateResponse extends ResponsePaginate {
	@ApiProperty({ type: AdminItemResponse })
	data: AdminItemResponse;

	constructor(item: any) {
		super(item);
		this.data = (item.data || []).map(
			(items: any) => new AdminItemResponse(items)
		);
	}
}
export class AdminPaginateResponseSwagger{
	@ApiProperty({type:ResponseMetaSwagger})
	meta:ResponseMetaSwagger;

	@ApiProperty({type:AdminPaginateResponse})
	data:AdminPaginateResponse;
}