/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { SettingShowResponse } from "./setting-show.response";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";

export class SettingsPaginateResponse {
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

	@ApiProperty({ type: [SettingShowResponse] })
	data: SettingShowResponse[];

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
			(item: any) => new SettingShowResponse(item)
		);
	}
}
export class SettingsPaginateResponseSwagger {
	@ApiProperty({ type: ResponseMetaSwagger })
	meta: ResponseMetaSwagger;

	@ApiProperty({ type: SettingsPaginateResponse })
	data: SettingsPaginateResponse;
}
