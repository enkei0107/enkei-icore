/** @format */

import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Permissions } from "./permission.entity";
import { AdminRoles } from "./admin-role.entity";

@Entity()
export class AdminRoleHasPermissions {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@JoinColumn({ name: "permission_id" })
	permission: Permissions;

	@Column({ type: "uuid" })
	permission_id: string;

	@JoinColumn({ name: "role_id" })
	role: AdminRoles;

	@Column({ type: "uuid" })
	role_id: string;
}
