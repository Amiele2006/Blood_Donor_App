import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'role' })
export class Role {
    @PrimaryGeneratedColumn('uuid')
    role_id!: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    role_name!: string;

    @Column({ type:'simple-array', nullable: true })
    permissions!: string[];

    @Column({ type: 'varchar'})
    role_description!: string;

    @OneToMany(() => User, (user) => user.role)
    user!: User[]; //1 role to many users
}