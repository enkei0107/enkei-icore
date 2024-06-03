/** @format */

export class EndpointFactory {
	end_point: string;

	constructor(end_point: string) {
		this.end_point = end_point;
	}
}

export const endpoints: EndpointFactory[] = [
	{
		end_point: "POST /backoffice/auth/register",
	},
	{
		end_point: "POST /backoffice/auth/login",
	},
	{
		end_point: "GET /backoffice/role-admin",
	},
	{
		end_point: "POST /backoffice/role-admin",
	},
	{
		end_point: "PUT /backoffice/role-admin/:id",
	},
	{
		end_point: "DELETE /backoffice/role-admin/:id",
	},
	{
		end_point: "GET /backoffice/permissions",
	},
	{
		end_point: "POST /backoffice/permissions",
	},
	{
		end_point: "GET /backoffice/role-admin-permissions/:role_id",
	},
	{
		end_point: "POST /backoffice/role-admin-permissions",
	},
	{
		end_point: "DELETE /backoffice/role-admin-permissions",
	},
	{
		end_point: "POST /backoffice/settings",
	},
	{
		end_point: "PUT /backoffice/settings/:id",
	},
	{
		end_point: "GET /backoffice/settings",
	},
	{
		end_point: "GET /backoffice/settings/:id",
	},
	{
		end_point: "DELETE /backoffice/settings/:id",
	},
	{
		end_point: "GET /backoffice/admin",
	},
	{
		end_point: "PUT /backoffice/admin/:id",
	},
	{
		end_point: "DELETE /backoffice/admin/:id",
	},
	{
		end_point: "GET /backoffice/admin/profile",
	},
	{
		end_point: "POST /backoffice/admin/profile",
	},
	{
		end_point: "GET /backoffice/users",
	},
	{
		end_point: "GET /backoffice/users/:id",
	},
	{
		end_point: "PUT /backoffice/users/:id",
	},
	{
		end_point: "DELETE /backoffice/users/:id",
	},
	{
		end_point: "GET /backoffice/banks",
	},
	{
		end_point: "GET /backoffice/banks/:id",
	},
	{
		end_point: "POST /backoffice/banks",
	},
	{
		end_point: "PUT /backoffice/banks/:id",
	},
	{
		end_point: "DELETE /backoffice/banks/:id",
	},
];
