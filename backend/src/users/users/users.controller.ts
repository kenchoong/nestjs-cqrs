import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ResponseDescription } from 'src/common/api/response-description';
import { CreateUserCommand } from '../application/create-user/create-user.command';
import { GetUserByUsernameQuery } from '../application/get-user-by-username/get-user-by-username.query';
import { CreateUserDTO } from './dto/request/create-user.dto';
import { GetUserByUsernameDTO } from './dto/request/get-user-by-username.dto';
import { CreateUserResponseDTO } from './dto/response/create-user-response.dto';
import { GetUserByUsernameResponseDTO } from './dto/response/get-user-by-username-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: ResponseDescription.CREATED,
    type: CreateUserResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: ResponseDescription.UNPROCESSABLE_ENTITY,
  })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async createUser(@Body() body: CreateUserDTO) {
    return await this.commandBus.execute(new CreateUserCommand(body.username));
  }

  @Get(':username')
  @ApiResponse({
    status: 200,
    description: ResponseDescription.OK,
    type: GetUserByUsernameResponseDTO,
  })
  async getByEmail(@Param('username') username: string) {
    return await this.queryBus.execute(new GetUserByUsernameQuery(username));
  }
}
