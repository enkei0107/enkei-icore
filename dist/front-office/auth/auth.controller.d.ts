/** @format */
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthDtoResponse } from "./response/auth.response";
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(registerDto: AuthRegisterDto): Promise<AuthDtoResponse>;
}
//# sourceMappingURL=auth.controller.d.ts.map