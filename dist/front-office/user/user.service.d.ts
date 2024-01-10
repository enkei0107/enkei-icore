/** @format */
import { Users } from "../../database/entities/user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    findOne(id: string): Promise<Users>;
}
//# sourceMappingURL=user.service.d.ts.map