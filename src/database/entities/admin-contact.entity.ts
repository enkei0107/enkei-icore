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
import { Admins } from "./admin.entity";

@Entity()
export class AdminContacts {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Admins, (admin) => admin.id, {
		onDelete: "CASCADE",
		onUpdate: "RESTRICT",
	})
	@JoinColumn({ name: "admin_id" })
	admin: Admins;

	@Column({ type: "uuid" })
	admin_id: string;

	@Column({ length: 50 })
	provider: string;

	@Column({ length: 100, unique: true })
	address: string;

	@Column({
		type: "boolean",
		default: true,
		transformer: {
			to: (value: number | undefined) =>
				value === undefined ? true : value == 1 ? true : false,
			from: (value: boolean) => (value ? 1 : 0),
		},
	})
	is_primary: number;

	@Column({
		type: "boolean",
		transformer: {
			to: (value: number | undefined) =>
				value === undefined ? false : value == 1 ? true : false,
			from: (value: boolean) => (value ? 1 : 0),
		},
	})
	is_verified: number;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
		onUpdate: "CURRENT_TIMESTAMP",
	})
	updated_at?: Date;
}
