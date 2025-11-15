import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Clinic } from './clinic.entity';

@Entity('admin')
export class Admin{
    @PrimaryGeneratedColumn()
    admin_id!: number;

    @Column({ type: 'date'})
    hiring_date!: Date;

    // @Column({type: 'varchar', length: 50, nullable: true})
    // role!: string;

    //1 user has 1 role
    @OneToOne(() => User, (user) => user.admin, {nullable: false})
    @JoinColumn({ name: 'user_id' })
    user!: User;

    // Link to Clinic (each admin manages one clinic)
    @OneToOne(() => Clinic, (clinic) => clinic.admin)
    @JoinColumn({ name: 'clinic_id' })
    clinic!: Clinic;

}