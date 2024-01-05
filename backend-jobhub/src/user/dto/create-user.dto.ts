import { IsString, IsEmail, Length } from 'class-validator';

class CreateUserDto {
  @IsString()
  @Length(3, 255)
  username: string;

  @IsEmail()
  email: string;

  

  hash: string; // Assuming you want to include the hash field

  constructor(username: string, email: string, hash: string) {
    this.username = username;
    this.email = email;
    this.hash = hash;
  }
}

export default CreateUserDto;
