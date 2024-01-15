/** @format */

import { ApiProperty } from "@nestjs/swagger";

export class SettingValueFormatDto {
	@ApiProperty()
	type: string;

	@ApiProperty()
	property: any;
}
