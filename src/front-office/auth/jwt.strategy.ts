/** @format */

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";
require("dotenv").config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_KEY,
		});
	}

	async validate(payload: { sub: string }) {
		const user = await this.userService.findOne(payload.sub);
		if (!user) {
			throw new UnauthorizedException("User not found");
		}
		return user;
	}
}
