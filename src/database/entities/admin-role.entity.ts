/** @format */

import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Admins } from "./admin.entity";
import { RoleAdmins } from "./role-admin.entity";

@Entity()
export class AdminRoles {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// define your relation
	@OneToOne(() => Admins, (admin) => admin.id, {
		onDelete: "CASCADE",
		onUpdate: "RESTRICT",
	})
	@JoinColumn({ name: "admin_id" })
	admin: Admins;

	@Column({ type: "uuid" })
	admin_id: string;

	@ManyToOne(() => RoleAdmins, (role) => role.id, {
		onDelete: "CASCADE",
		onUpdate: "RESTRICT",
	})
	@JoinColumn({ name: "role_id" })
	role: RoleAdmins;

	@Column({ type: "uuid" })
	role_id: string;
}
