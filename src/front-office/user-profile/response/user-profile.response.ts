/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { UserAddress } from "../../../database/entities/user-address.entity";
import { UserContacts } from "../../../database/entities/user-contact.entity";
import { UserContactProviderEnum } from "../../../config/enum/user/user-contact-provider.enum";
import { GenderEnum } from "../../../config/enum/user/user-gender.enum";
import { ReligionEnum } from "../../../config/enum/user/user-religion.enum";
import { Users } from "../../../database/entities/user.entity";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";

export class UserProfileAddressDtoResponse {
	@ApiProperty({ type: String })
	address: string;

	@ApiProperty({ type: String })
	postal_code: string;

	@ApiProperty({ type: String })
	sub_district: string;

	@ApiProperty({ type: String })
	district: string;

	@ApiProperty()
	properties: JSON | {};
	constructor(data: UserAddress) {
		this.address = data?.address ?? "";
		this.postal_code = data?.postal_code ?? "";
		this.sub_district = data?.sub_district ?? "";
		this.district = data?.district ?? "";
		this.properties = data?.properties ?? {};
	}
}
export class UserProfileContactsDtoResponse {
	@ApiProperty({ format: "uuid" })
	id: string;

	@ApiProperty({ enum: UserContactProviderEnum })
	provider: string;

	@ApiProperty()
	is_primary: number;

	@ApiProperty()
	is_verified: number;

	@ApiProperty()
	created_at: Date;

	@ApiProperty()
	updated_at: Date;

	constructor(data: UserContacts) {
		this.id = data?.id ?? "";
		this.provider = data?.provider ?? "";
		this.is_primary = data?.is_primary;
		this.is_verified = data?.is_verified;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
	}
}
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
export class UserProfileDtoResponseSchemaSwagger {
	@ApiProperty({ type: ResponseMetaSwagger })
	meta: ResponseMetaSwagger;
	@ApiProperty({ type: UserProfileDtoResponse })
	data: UserProfileDtoResponse;
}
