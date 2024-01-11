import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsPhoneNumber } from 'class-validator';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  salary?: number;

  @IsNotEmpty()
  @IsInt()
  @IsPhoneNumber(undefined, { message: 'Invalid phone number' })
  phoneNumber?: number;
}
