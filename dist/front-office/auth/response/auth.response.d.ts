import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";
export declare class AuthDtoResponse {
    token: string;
    role: Array<string>;
    constructor(data: any);
}
export declare class AuthResponseDtoSchemaSwagger {
    meta: ResponseMetaSwagger;
    data: AuthDtoResponse;
}
//# sourceMappingURL=auth.response.d.ts.map