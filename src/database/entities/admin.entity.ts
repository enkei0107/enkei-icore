/** @format */

import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { AdminContacts } from "./admin-contact.entity";
import { AdminRoles } from "./admin-role.entity";

@Entity()
export class Admins {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;
	@Column({ type: "timestamp" })
	login_at: Date;

	@Column({ nullable: true })
	remember_token?: string;

	@Column({ nullable: true, type: "text" })
	avatar?: string;

	@Column({ nullable: true })
	status_data: string;

	@Column({
		type: "boolean",
		transformer: {
			to: (value: number | undefined) =>
				value === undefined ? false : value == 1 ? true : false,
			from: (value: boolean) => (value ? 1 : 0),
		},
	})
	is_active: number;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
		onUpdate: "CURRENT_TIMESTAMP",
	})
	updated_at?: Date;

	// define your relation
	@OneToMany(() => AdminContacts, (contacts) => contacts.admin, {
		onDelete: "CASCADE",
		onUpdate: "RESTRICT",
	})
	contacts: AdminContacts[];

	@OneToOne(() => AdminRoles, (adminRole) => adminRole.admin, {
		onDelete: "CASCADE",
		onUpdate: "RESTRICT",
	})
	admin_role: AdminRoles;
}
