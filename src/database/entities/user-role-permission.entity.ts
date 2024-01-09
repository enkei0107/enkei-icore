import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './role.entity';
import { Permissions } from './permission.entity';

@Entity()
export class UserRolePermissions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Roles, (role) => role.id, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @Column({ type: 'uuid' })
  role_id: string;

  @ManyToOne(() => Permissions, (permission) => permission.id, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'permission_id' })
  permission: Permissions;

  @Column({ type: 'uuid' })
  permission_id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at?: Date;
}
