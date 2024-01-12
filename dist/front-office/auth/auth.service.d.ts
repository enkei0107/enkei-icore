/** @format */
import { Users } from "../../database/entities/user.entity";
import { Repository } from "typeorm";
import { UserContacts } from "../../database/entities/user-contact.entity";
import { UserRoles } from "../../database/entities/user-role.entity";
import { Roles } from "../../database/entities/role.entity";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthOauthFormatDto } from "./dto/auth-oauth-format.dto";
import { AuthOauth2Dto } from "./dto/auth-oauth2.dto";
export declare class AuthService {
    private readonly userRepository;
    private readonly userContactRepository;
    private readonly userRoleRepository;
    private readonly roleRepository;
    constructor(userRepository: Repository<Users>, userContactRepository: Repository<UserContacts>, userRoleRepository: Repository<UserRoles>, roleRepository: Repository<Roles>);
    register(registerDto: AuthRegisterDto): Promise<Users>;
    login(loginDto: AuthLoginDto): Promise<Users>;
    oauth2(oauthDto: AuthOauth2Dto): Promise<Users>;
    protected oauthGithub(accessToken: string): Promise<AuthOauthFormatDto>;
    protected oauthGoogle(accessToken: string): Promise<AuthOauthFormatDto>;
    protected generatedUniqueUsername(baseUsername: string, suffix?: number): Promise<string>;
}
//# sourceMappingURL=auth.service.d.ts.map