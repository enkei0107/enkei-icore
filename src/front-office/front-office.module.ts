/** @format */

import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { InterceptorProvider } from "../config/interceptor/interceptor.provider";
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserAddressModule } from './user-address/user-address.module';
import { UserContactModule } from './user-contact/user-contact.module';
import { MediaModule } from './media/media.module';
import { UserBankModule } from './user-bank/user-bank.module';

@Module({
	imports: [AuthModule, UserModule, UserProfileModule, UserAddressModule, UserContactModule, MediaModule, UserBankModule],
	controllers: [],
	providers: [...InterceptorProvider],
})
export class FrontOfficeModule {}
