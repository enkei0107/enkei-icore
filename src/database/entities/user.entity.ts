/** @format */

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
		onUpdate: "CURRENT_TIMESTAMP",
	})
	updated_at?: Date;
}
