/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { GenderEnum } from "../../../config/enum/user/user-gender.enum";
import { ReligionEnum } from "../../../config/enum/user/user-religion.enum";
import {
	UserProfileAddressDtoResponse,
	UserProfileContactsDtoResponse,
} from "../../../front-office/user-profile/response/user-profile.response";
import { Users } from "../../../database/entities/user.entity";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";

export class UserProfileDtoResponse {
	@ApiProperty({ type: String })
	avatar: string;

	@ApiProperty({ type: String })
	name: string;

	@ApiProperty({ enum: GenderEnum })
	gender: string;

	@ApiProperty({ type: String })
	place_of_birth: string;

	@ApiProperty()
	date_of_birth: Date;

	@ApiProperty({ enum: ReligionEnum })
	religion: string;

	@ApiProperty()
	is_active: number;

	@ApiProperty({ type: JSON })
	properties: JSON;

	@ApiProperty({ type: UserProfileAddressDtoResponse })
	address: UserProfileAddressDtoResponse | {};

	@ApiProperty({ type: [UserProfileContactsDtoResponse] })
	contacts: UserProfileContactsDtoResponse[];

	constructor(data: Users) {
		this.avatar = data?.avatar || "";
		this.name = data?.profile?.name || "";
		this.gender = data?.profile?.gender || "";
		this.place_of_birth = data?.profile?.place_of_birth || "";
		this.date_of_birth = data?.profile?.date_of_birth;
		this.religion = data?.profile?.religion || "";
		this.is_active = data?.is_active || 0;
		this.properties = data?.profile?.properties;
		this.address = data["address"]
			? new UserProfileAddressDtoResponse(data["address"])
			: {};
		this.contacts = data["contacts"]
			? data["contacts"].map(
					(contact) => new UserProfileContactsDtoResponse(contact)
			  )
			: [];
	}
}

export class UserPaginateResponse {
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

	@ApiProperty({ type: [UserProfileDtoResponse] })
	data: UserProfileDtoResponse[];

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
			(item: any) => new UserProfileDtoResponse(item)
		);
	}
}

export class UserPaginateResponseSwagger {
	@ApiProperty({ type: ResponseMetaSwagger })
	meta: ResponseMetaSwagger;
	@ApiProperty({ type: UserPaginateResponse })
	data: UserPaginateResponse;
}
