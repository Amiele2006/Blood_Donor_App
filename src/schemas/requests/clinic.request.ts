import { 
  IsString,
  IsNumber,
  IsOptional,
  MinLength
} from 'class-validator';

export class CreateClinicRequest {
  @IsString()
  @MinLength(1)
  clinic_name!: string;

  @IsString()
  @MinLength(1)
  registration_number!: string;

  @IsString()
  @MinLength(1)
  address!: string;

  @IsOptional()
  @IsNumber()
  location_id?: number;
}

export class UpdateClinicRequest {
    @IsOptional()
    @IsString()
    @MinLength(1)
    clinic_name?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    registration_number?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    address?: string;

    @IsOptional()
    @IsNumber()
    location_id?: number;

}

export class FindClinicByNameRequest {
    @IsString()
    @IsOptional()
    clinic_name!: string;
}

export class DeleteClinicRequest {
    id!: number;

    @IsOptional()
    @IsString()
    clinic_name?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    registration_number?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    address?: string;

    @IsOptional()
    @IsNumber()
    location_id?: number;

}