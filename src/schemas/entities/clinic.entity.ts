import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Admin } from './admin.entity';
import { Donations } from './donations.entity';

@Entity('clinic')
export class Clinic{
  @PrimaryGeneratedColumn()
  clinic_id!: string;

  @Column({ type: 'int', nullable: true })
  location_id!: number;

  @Column({ type: 'varchar', length: 100 })
  clinic_name!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  registration_number!: string;

  @Column({ type: 'varchar', length: 255 })
  address!: string;

  // Each clinic has one admin
  @OneToOne(() => Admin, (admin) => admin.clinic)
  admin!: Admin; // joining the columns

  // Each clinic can have many donations
  @OneToMany(() => Donations, (donation) => donation.clinic)
  donations!: Donations[];
}