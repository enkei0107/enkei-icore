import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Banks{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name: string;

    @Column({ unique: true })
    code: string;

    @Column({ type: 'text' })
    logo: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at?: Date;
}