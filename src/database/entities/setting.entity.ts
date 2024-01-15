/** @format */

import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { SettingValueFormatDto } from "../../back-office/setting/dto/setting-value-format.dto";

@Entity()
export class Settings {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@Column({ type: "jsonb", default: {} })
	value: SettingValueFormatDto;

  @Column({
    type: 'boolean',
    transformer: {
      to: (value: number | undefined) => value === undefined ? true : ((value == 1) ? true : false),
      from: (value: boolean) => (value) ? 1 : 0,
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
}
