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
import { UserProfiles } from "./user-profile.entity";
import { UserAddress } from "./user-address.entity";
import { UserContacts } from "./user-contact.entity";
import { UserRoles } from "./user-role.entity";

@Entity()
export class Users {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 50, unique: true })
	username: string;

	@Column({ nullable: true })
	password?: string;

	@Column({ type: "timestamp" })
	login_at: Date;

	@Column({ nullable: true })
	remember_token?: string;

	@Column({ nullable: true, type: "text" })
	avatar?: string;

	@Column({
		type: "boolean",
		default: true,
		transformer: {
			to: (value: number | undefined) =>
				value === undefined ? true : value == 1 ? true : false,
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

	//   define your relations
	@OneToMany(() => UserRoles, (userRole) => userRole.user, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	role?: UserRoles;
	@OneToOne(() => UserProfiles, (profile) => profile.user, {
		onUpdate: "RESTRICT",
		onDelete: "CASCADE",
	})
	profile?: UserProfiles;

	@OneToOne(() => UserAddress, (address) => address.user, {
		onUpdate: "RESTRICT",
		onDelete: "CASCADE",
	})
	address?: UserAddress;

	@OneToMany(() => UserContacts, (contact) => contact.user, {
		onUpdate: "RESTRICT",
		onDelete: "CASCADE",
	})
	contacts: UserContacts[];
}
