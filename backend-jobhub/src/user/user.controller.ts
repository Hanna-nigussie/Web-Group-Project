import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from './decorator/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import CreateUserDto from './dto/create-user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);
      return { user: newUser };
    } catch (error) {
      console.error('Error creating user:', error);
      return { error: 'Something went wrong' };
    }
  }

  @Get()
async getAllUsers(): Promise<User[]> {
  try {
    const allUsers = await this.userService.getAllUsers();
    return allUsers;
  } catch (error) {
    console.error('Error getting all users:', error);
    return []; 
  }
}

  


@Delete(':id')
async deleteUser(@Param('id') userId: string) {
  try {
    const result = await this.userService.deleteUser(userId);
    return result; // You can return a success message or any relevant information
  } catch (error) {
    console.error('Error deleting user:', error);
    return { error: 'Something went wrong' };
  }
}


@Patch(':id')
updateUser(@Param('id') userId: string, @Body() dto: UpdateUserDto) {
  return this.userService.updateUser(userId, dto);
}



}
