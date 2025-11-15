import { 
  IsString, 
  IsEmail, 
  MinLength, 
  IsDateString,
  MaxLength,
  IsOptional,
  IsUUID,
  IsNotEmpty
} from 'class-validator';

//getallusers

//create user
export class CreateUserRequest {

    @IsString()
    @MinLength(1, { message: 'First name must be at least 1 character long' })
    @MaxLength(100)
    first_name!: string;

    @IsString()
    @MinLength(1)    
    @MaxLength(100)
    last_name!: string;

    @IsDateString()
    dob!: string; // format is YYYY-MM-DD

    @IsEmail({}, { message: 'Please provide a valid email address' })
    email!:string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password!: string;

    @IsString()
    @IsNotEmpty()
    role_name!: string;
}

//findbyid
export class FindByIdRequest {
  user_id!:string;
}

//update user
export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  @MinLength(1)
  first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  last_name?: string;
  
  @IsOptional()
  @IsDateString()
  dob?: string; 

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}

//delete user
export class DeleteUserRequest {
  user_id!: string;

  // @IsString()
  // @MinLength(1)
  // first_name?: string;

  // @IsOptional()
  // @IsString()
  // @MinLength(1)
  // last_name?: string;

  // @IsOptional()
  // @IsEmail()
  // email?:string;

  // @IsOptional()
  // @IsString()
  // @MinLength(8)
  // password?:string;

}