/** @format */

import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Users } from "./user.entity";
import { Roles } from "./role.entity";

@Entity()
export class UserRoles {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Users, (user) => user.id, {
		onDelete: "CASCADE",
		onUpdate: "RESTRICT",
	})
	@JoinColumn({ name: "user_id" })
	user: Users;

	@Column({ type: "uuid" })
	user_id: string;

	@ManyToOne(() => Roles, (role) => role.id, {
		onDelete: "CASCADE",
		onUpdate: "RESTRICT",
	})
	@JoinColumn({ name: "role_id" })
	role: Roles;

	@Column({ type: "uuid" })
	role_id: string;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
		onUpdate: "CURRENT_TIMESTAMP",
	})
	updated_at?: Date;
}
