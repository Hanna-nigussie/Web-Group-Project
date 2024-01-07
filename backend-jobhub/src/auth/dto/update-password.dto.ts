import { IsString, Length  } from 'class-validator'

export class UpdatePasswordDto {
  @IsString()
  @Length(8,12)
  currentPassword: string

  @IsString()
  @Length(8,12)
  newPassword: string
}
