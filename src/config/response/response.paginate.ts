import { ApiProperty } from "@nestjs/swagger";

export class ResponsePaginate{
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
}