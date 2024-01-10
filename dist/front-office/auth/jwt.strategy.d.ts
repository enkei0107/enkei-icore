/** @format */
import { UserService } from "../user/user.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: {
        sub: string;
    }): Promise<import("../../database/entities/user.entity").Users>;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map