/** @format */

import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { InterceptorProvider } from "../config/interceptor/interceptor.provider";

@Module({
	imports: [AuthModule, UserModule],
	controllers: [],
	providers: [...InterceptorProvider],
})
export class FrontOfficeModule {}
