import { ApiProperty } from "@nestjs/swagger";
import { ResponsePaginate } from "../../../config/response/response.paginate";
import { ResponseMetaSwagger } from "../../../config/swagger/response-meta.swagger";
import { AdminRoleHasPermissions } from "../../../database/entities/admin-role-has-permission.entity";

export class RoleAdminPermissionItemResponseSchema{
    id:string;
    permission_id:string;
    end_point:string;
    constructor(data:AdminRoleHasPermissions){
        this.id = data?.id || '';
        this.permission_id = data?.permission?.id || '';
        this.end_point = data?.permission?.end_point || '';
    }
}
export class RoleAdminPermissionPaginateResponseSchema extends ResponsePaginate{
    @ApiProperty({type:RoleAdminPermissionItemResponseSchema})
    data:RoleAdminPermissionItemResponseSchema;
    constructor(data:any){
        super(data);
		this.data = (data.data || []).map(
			(item: AdminRoleHasPermissions) => new RoleAdminPermissionItemResponseSchema(item)
		);
    }
}
export class RoleAdminPermissionPaginateResponseSchemaSwagger{
    @ApiProperty({type:ResponseMetaSwagger})
    meta:ResponseMetaSwagger;

    @ApiProperty({type:RoleAdminPermissionPaginateResponseSchema})
    data:RoleAdminPermissionPaginateResponseSchema;
}