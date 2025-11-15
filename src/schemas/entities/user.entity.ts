import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Role } from "./role.entity";
import { Admin } from "./admin.entity";
import { Donor } from './donor.entity';

@Entity({ name: 'User'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id!: string; //"I, the developer, guarantee that this property will have a value at runtime (even though you can't see it being assigned). Trust me."

    @Column({ type: 'varchar', length: 100})
    first_name!: string;

    @Column({ type: 'varchar', length: 100 })
    last_name!: string;

    @Column({ type: 'date' })
    dob!: Date;

    @Column({ type: 'varchar', length:255, unique:true })
    email!: string;

    @Column({ type:"varchar", length: 255 })
    password!: string;

    // @Column({ type: 'uuid' }) 
    role_name!: string;

    //foreign key column
    @ManyToOne(() => Role, (role: Role) => role.user) // many users to one role
    @JoinColumn({ name: 'role_name', referencedColumnName: 'role_name' })
    role!: Role; // many users to 1 role

    // Optional link to donor info (only if role = 'donor')
    @OneToOne(() => Donor, (donor: Donor) => donor.user)
    donor?: Donor;

    @OneToOne(() => Admin, (admin: Admin) => admin.user)
    admin?: Admin;
}