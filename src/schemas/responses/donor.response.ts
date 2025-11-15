import { Exclude, Expose } from 'class-transformer';

export enum DonorStatus {
    Eligible = 'eligible',
    Ineligible = 'ineleigible',
    Deferred = 'deferred',
}

@Exclude()
export class DonorResponse {
    @Expose()
    user_id!: string;

    @Expose()
    donor_id!: string;

    @Expose()
    blood_type!:string;

    @Expose()
    status!: DonorStatus;

    @Expose()
    next_donation_date!: string | null;

}