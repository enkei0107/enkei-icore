/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";
import { Settings } from "../../../database/entities/setting.entity";
import { SettingValueFormatDto } from "../dto/setting-value-format.dto";

export class SettingShowResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty({ type: SettingValueFormatDto })
	value: SettingValueFormatDto | {};

	@ApiProperty()
	created_at: Date;

	@ApiProperty()
	updated_at: Date;

	constructor(data: Settings) {
		this.id = data.id;
		this.name = data?.name ?? "";
		this.value = data?.value ?? {};
		this.created_at = data?.created_at;
		this.updated_at = data?.updated_at;
	}
}

export class SettingShowResponseSwagger {
	@ApiProperty({ type: ResponseMetaSwagger })
	meta: ResponseMetaSwagger;

	@ApiProperty({ type: SettingShowResponse })
	data: SettingShowResponse;
}
