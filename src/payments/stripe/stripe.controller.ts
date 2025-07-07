import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('payments')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createSession(@Body() body: { price: number; userId: number }) {
    return this.stripeService.createCheckoutSession(body.price, body.userId);
  }

}
