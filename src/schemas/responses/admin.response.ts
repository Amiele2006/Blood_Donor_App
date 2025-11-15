import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminResponse {
    @Expose()
    user_id!: string;

    @Expose()
    clinic_id!: number;

    @Expose()
    hiring_date!: string;
}