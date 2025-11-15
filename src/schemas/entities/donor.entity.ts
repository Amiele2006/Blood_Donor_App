import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from "./user.entity";
import {Donations}  from "./donations.entity";

@Entity('donors')
export class Donor {
    @PrimaryGeneratedColumn()
    donor_id!: number;

    // @Column({ type: 'int'})
    // age!: number;

    @Column("simple-array")
    blood_type!: string[];

    @Column({type: 'date', nullable: true})
    next_donation_date!: Date;

    @Column({ type: 'varchar', length: 50})
    status!: string;

    @OneToOne(() => User, (user) => user.donor)
    @JoinColumn({ name: 'user_id' })
    user!: User;// one user to one donor/admin

    @OneToMany(() => Donations, (donation) => donation.donor)
    donations!: Donations[];// donations: 1 donor to many donations

}