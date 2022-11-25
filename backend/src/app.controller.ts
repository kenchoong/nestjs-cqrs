import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller('app')
export class AppController {
  @Get('/health')
  @ApiResponse({
    status: 20,
    description: 'health check',
  })
  getHello(): string {
    return 'ok';
  }
}
