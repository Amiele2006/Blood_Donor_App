import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ClinicResponse {
    @Expose()
    clinic_name!: string;

    @Expose()
    registration_number!: string;

    @Expose()
    address!: string;

    @Expose()
    location!: number;
}