import { 
  IsDateString,
  IsIn,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';

// id, age, blood_type, next_donation_date, status of elgiigble/ineligible

export enum DonorStatus {
    ELIGIBLE = 'eligible',
    INELIGIBLE = 'ineligible',
    DEFERRED = 'deferred',
}
//create donor
export class CreateDonorRequest {
    @IsUUID()
    user_id!: string;

    // @IsString()
    // id!: string;

    @IsIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    blood_type!: string[];

    @IsEnum(DonorStatus)
    status!: DonorStatus;

    @IsDateString()
    next_donation_date!: string;
}

export class UpdateDonorRequest {
  @IsOptional()
  @IsIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  blood_type?: string;

  @IsOptional()
  @IsEnum(DonorStatus)
  status?: DonorStatus;
}

export class DeleteDonorRequest {
  user_id?: string;
}

export class FindDonorByIdRequest {
  user_id?: string;
}