import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  async createUser() {
    return;
  }

  @Get(':email')
  async getByEmail() {
    return;
  }
}
