import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Clinic } from './clinic.entity';
import { Donor } from './donor.entity'

@Entity('donations')
export class Donations {
    @PrimaryGeneratedColumn()
    donations_id!: number;

    // @Column({ type: 'varchar', length: 100})
    // clinic_id!: string;

    @Column({ type: 'date'})
    donation_date!: Date;

    @Column({ type: 'varchar', length: 50})
    donation_type!: string; //platelets,blood 

    @Column({ type: 'varchar', length: 150})
    location!: string;

    @Column({ type: 'varchar', length: 50, unique: true})
    donation_code!: string;

    // Each donation happens at one clinic
    @ManyToOne(() => Clinic, (clinic) => clinic.donations)
    @JoinColumn({ name: 'clinic_id' })
    clinic!: Clinic;

    @ManyToOne(() => Donor, (donor) => donor.donations)
    @JoinColumn({ name: 'donor_id' })
    donor!: Donor; //many dononations to one donor. join columns together with that relationship.

} 