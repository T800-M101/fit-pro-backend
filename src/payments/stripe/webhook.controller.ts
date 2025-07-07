import { Controller, Post, RawBody, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';

@Controller('webhooks')
export class WebhookController {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
  });

  constructor(private usersService: UsersService){}

  @Post('webhook')
  handleWebhook(@Req() req: Request) {
    const sig = req.headers['stripe-signature'];
    const rawBody = req['rawBody'];

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return { received: false };
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userIdString = session.metadata?.userId;
      if (!userIdString) {
       throw new Error('User ID is missing in session metadata');
      }
      const userId = Number(userIdString);
      console.log('Payment completed. User ID:', userId);
     

      this.usersService.activateMembership(userId);
    }

    return { received: true };
  }


}
