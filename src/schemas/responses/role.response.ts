import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RoleResponse {
    @Expose()
    role_id!: string;
}