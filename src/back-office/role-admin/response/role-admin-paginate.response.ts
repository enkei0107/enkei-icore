/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { RoleAdmins } from "../../../database/entities/role-admin.entity";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";

export class RoleAdminItemResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	created_at: Date;

	@ApiProperty()
	updated_at: Date;

	constructor(data: RoleAdmins) {
		this.id = data?.id;
		this.name = data?.name;
		this.created_at = data?.created_at;
		this.updated_at = data?.updated_at;
	}
}
export class RoleAdminPaginateResponse {
	@ApiProperty()
	per_page: number;

	@ApiProperty()
	total: number;

	@ApiProperty()
	current_page: number;

	@ApiProperty()
	total_page: number;

	@ApiProperty()
	last_page_url: string;

	@ApiProperty()
	next_page_url: string;

	@ApiProperty()
	previous_page_url: string;

	@ApiProperty()
	first_page_url: string;

	@ApiProperty({ type: [RoleAdminItemResponse] })
	data: RoleAdminItemResponse[];

	constructor(data: any) {
		this.per_page = data?.meta?.itemsPerPage || 0;
		this.total = data?.meta?.totalItems || 0;
		this.current_page = data?.meta?.currentPage || 0;
		this.total_page = data?.meta?.totalPages || 0;
		this.last_page_url = data?.links?.last || "";
		this.next_page_url = data?.links?.next || "";
		this.previous_page_url = data?.links?.previous || "";
		this.first_page_url = data?.links?.first || "";
		this.data = (data.data || []).map(
			(item: any) => new RoleAdminItemResponse(item)
		);
	}
}
export class RoleAdminPaginateResponseSwagger {
	@ApiProperty({ type: ResponseMetaSwagger })
	meta: ResponseMetaSwagger;

	@ApiProperty({ type: RoleAdminPaginateResponse })
	data: RoleAdminPaginateResponse;
}
