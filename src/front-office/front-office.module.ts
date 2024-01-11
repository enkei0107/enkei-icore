/** @format */

import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { InterceptorProvider } from "../config/interceptor/interceptor.provider";
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserAddressModule } from './user-address/user-address.module';

@Module({
	imports: [AuthModule, UserModule, UserProfileModule, UserAddressModule],
	controllers: [],
	providers: [...InterceptorProvider],
})
export class FrontOfficeModule {}
