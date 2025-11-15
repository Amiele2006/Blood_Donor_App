import { 
  IsString, 
  MinLength,
  MaxLength,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateRoleRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    role_name!: string;

    @IsString()
    @MinLength(3)
    role_description!: string;

    @IsArray()
    @IsString({ each: true })
    permissions!: string[];
}

//findbyrolename
export class FindByRoleNameRequest {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    role_name!: string;
}

//update role
export class UpdateRoleRequest {
    @IsString()
    @IsOptional()
    @MinLength(2)
    role_name?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    role_description?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    permissions?: string[];
}


export class DeleteRoleRequest {
    @IsString()
    @IsOptional()
    @MinLength(2)
    role_name?: string;
}