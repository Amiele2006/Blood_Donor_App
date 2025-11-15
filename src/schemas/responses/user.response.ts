import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponse {
    @Expose()
    user_id!: string;

    @Expose()
    first_name!: string;

    @Expose()
    last_name!: string;

    @Expose()
    email!:string;

    @Expose()
    dob!:string;

    @Expose()
    role_name!: string;
}