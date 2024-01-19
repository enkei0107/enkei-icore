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

export class UserShowDtoResponse {
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
export class UserShowDtoResponseSwagger {
	@ApiProperty({ type: ResponseMetaSwagger })
	meta: ResponseMetaSwagger;
	@ApiProperty({ type: UserShowDtoResponse })
	data: UserShowDtoResponse;
}
