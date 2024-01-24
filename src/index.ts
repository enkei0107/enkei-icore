/** @format */

import { DatabaseModule } from "./database/database.module";
import { dataSourceOptions } from "./database/data-source";
import { AuthModule } from "./front-office/auth/auth.module";
import { AuthService } from "./front-office/auth/auth.service";
import { AuthController } from "./front-office/auth/auth.controller";
import { MediaModule } from "./front-office/media/media.module";
import { MediaController } from "./front-office/media/media.controller";
import { MediaService } from "./front-office/media/media.service";
import { FrontOfficeModule } from "./front-office/front-office.module";

// Back Office
import { BackOfficeModule } from "./back-office/back-office.module";
import { PermissionModule } from "./back-office/permission/permission.module";
export {
	DatabaseModule,
	dataSourceOptions,
	AuthModule,
	AuthService,
	AuthController,
	MediaModule,
	MediaService,
	MediaController,
	FrontOfficeModule,
	BackOfficeModule,
	PermissionModule,
};
