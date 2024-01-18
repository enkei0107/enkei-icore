/** @format */

import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Permissions } from "./permission.entity";
import { RoleAdmins } from "./role-admin.entity";

@Entity()
export class AdminRoleHasPermissions {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Permissions, (permission) => permission.id, {
		onDelete: "CASCADE",
		onUpdate: "RESTRICT",
	})
	@JoinColumn({ name: "permission_id" })
	permission: Permissions;

	@Column({ type: "uuid" })
	permission_id: string;

	@ManyToOne(() => RoleAdmins, (role) => role.id, {
		onDelete: "CASCADE",
		onUpdate: "RESTRICT",
	})
	@JoinColumn({ name: "role_id" })
	role: RoleAdmins;

	@Column({ type: "uuid" })
	role_id: string;
}
