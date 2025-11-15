import {
    IsUUID,
    IsNumber,
    IsDateString,
    IsOptional
} from 'class-validator';

export class CreateAdminRequest {
    @IsUUID()
    user_id!: string;

    @IsNumber()
    @IsOptional()
    clinic_id!: number;

    @IsDateString()
    hiring_date!: string;
}

export class UpdateAdminRequest {
    // @IsUUID()
    // user_id?: string;

    @IsOptional()
    @IsNumber()
    clinic_id?: number;

    @IsOptional()
    @IsDateString()
    hiring_date?: string;
}

export class FindAdminByUserIdRequest {
    @IsOptional()
    user_id?: string;
}

export class DeleteAdminRequest {
    user_id?: string;

    // @IsNumber()
    // clinic_id?: number;,

    // @IsDateString()
    // hiring_date?: string;
}