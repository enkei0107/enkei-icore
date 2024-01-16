/** @format */

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminService } from "./admin.service";

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, "admin-jwt") {
	constructor(private adminService: AdminService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_KEY,
		});
	}

	async validate(payload: { sub: string }) {
		const user = await this.adminService.findOne(payload.sub);
		if (!user) {
			throw new UnauthorizedException("User not found");
		}
		return user;
	}
}
