import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsEnum } from 'class-validator';
import { UserType } from './enums';


export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  salary?: number;

  @IsNotEmpty()
  @IsString()
  createrId: string;

  @IsNotEmpty()
  @IsEnum(UserType, { message: 'Invalid userType. Must be either EMPLOYEE or JOB_SEEKER' })
  userType: UserType;
}
