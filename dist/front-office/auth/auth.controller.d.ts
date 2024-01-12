/** @format */
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthDtoResponse } from "./response/auth.response";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthOauth2Dto } from "./dto/auth-oauth2.dto";
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(registerDto: AuthRegisterDto): Promise<AuthDtoResponse>;
    login(loginDto: AuthLoginDto): Promise<AuthDtoResponse>;
    oauth(oauthDto: AuthOauth2Dto): Promise<AuthDtoResponse>;
}
//# sourceMappingURL=auth.controller.d.ts.map