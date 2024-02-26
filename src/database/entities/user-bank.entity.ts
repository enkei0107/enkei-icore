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
import { Banks } from "./bank.entity";

@Entity()
export class UserBanks {
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

	@ManyToOne(() => Banks, (bank) => bank.id, {
		onDelete: "CASCADE",
		onUpdate: "RESTRICT",
	})
	@JoinColumn({ name: "bank_id" })
	bank: Banks;
	@Column({ type: "uuid" })
	bank_id: string;

	@Column({ type: "text" })
	bank_holder: string;

	@Column({ type: "text" })
	bank_account_number: string;

	@Column({ type: "timestamp" })
	verified_at: Date;

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

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at?: Date;
}
