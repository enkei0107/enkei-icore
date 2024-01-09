/** @format */

import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class UserContacts {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ length: 50 })
	provider: string;

	@Column({ length: 100, unique: true })
	address: string;

	@Column({ default: true })
	is_primary: Boolean;

	@Column({ default: false })
	is_verified: Boolean;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
		onUpdate: "CURRENT_TIMESTAMP",
	})
	updated_at?: Date;
}
