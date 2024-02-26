/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { Banks } from "../../../database/entities/bank.entity";
import { ResponsePaginate } from "../../../config/response/response.paginate";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";

export class BankItemsResponseSchema {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	code: string;

	@ApiProperty()
	logo: string;

	@ApiProperty()
	created_at: Date;

	@ApiProperty()
	updated_at: Date;

	constructor(data: Banks) {
		this.id = data?.id || "";
		this.name = data?.name || "";
		this.code = data?.code || "";
		this.logo = data?.logo || "";
		this.created_at = data?.created_at;
		this.updated_at = data?.updated_at;
	}
}

export class BankPaginateResponseSchema extends ResponsePaginate{
    @ApiProperty({type:[BankItemsResponseSchema]})
    data:BankItemsResponseSchema[];
    constructor(data:any){
        super();
        this.per_page = data?.meta?.itemsPerPage || 0;
		this.total = data?.meta?.totalItems || 0;
		this.current_page = data?.meta?.currentPage || 0;
		this.total_page = data?.meta?.totalPages || 0;
		this.last_page_url = data?.links?.last || "";
		this.next_page_url = data?.links?.next || "";
		this.previous_page_url = data?.links?.previous || "";
		this.first_page_url = data?.links?.first || "";
		this.data = (data.data || []).map(
			(item: Banks) => new BankItemsResponseSchema(item)
		);
    }
}
export class BankPaginateResponseSchemaSwagger{
    @ApiProperty({type:ResponseMetaSwagger})
    meta:ResponseMetaSwagger;

    @ApiProperty({type:BankPaginateResponseSchema})
    data:BankPaginateResponseSchema;
}