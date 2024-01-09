/** @format */

import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { UserRolePermissions } from "./user-role-permission.entity";
@Entity()
export class Roles {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
		onUpdate: "CURRENT_TIMESTAMP",
	})
	updated_at?: Date;

	
  //define your relations
  @OneToMany(() => UserRolePermissions, (user_roles) => user_roles.role, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  user_roles: UserRolePermissions[];
}
