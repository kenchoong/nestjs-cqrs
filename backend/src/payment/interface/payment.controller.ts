import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Headers,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiNotFoundResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { CreatePaymentIntentCommand } from '../application/create-payment-intent/create-payment-intent.command';
import { CreateSessionCommand } from '../application/create-session/create-session.command';
import { ProcessWebhookCommand } from '../application/process-stripe-webhook/process-webhook.command';
import { CreateSessionDTO } from './dto/request/create-session.dto';
import { CreatePaymentIntentResponseDto } from './dto/response/create-payment-intent-response.dto';
import { CreateSessionResponseDto } from './dto/response/create-session-response.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/checkout-out-session')
  @ApiResponse({
    status: 201,
    description: 'ok',
    type: CreateSessionResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'not found',
  })
  async createSession(@Body() body: CreateSessionDTO) {
    return await this.commandBus.execute(
      new CreateSessionCommand(body.orderId),
    );
  }

  @Post('/create-payment-intent')
  @ApiResponse({
    status: 201,
    description: 'ok',
    type: CreatePaymentIntentResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'not found',
  })
  async createPaymentIntent(@Body() body: CreateSessionDTO) {
    return await this.commandBus.execute(
      new CreatePaymentIntentCommand(body.orderId),
    );
  }

  @Post('/stripe-webhook')
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Body() raw: Buffer,
  ) {
    console.log('Get hit');
    if (!signature) {
      console.log('Bad request');
      throw new BadRequestException('Missing stripe-signature header');
    }

    return await this.commandBus.execute(
      new ProcessWebhookCommand(signature, raw),
    );
  }
}
