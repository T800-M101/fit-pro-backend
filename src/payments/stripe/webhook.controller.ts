import { BadRequestException, Controller, Post, Req, Res } from '@nestjs/common';
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
  async handleWebhook(@Req() req: Request) {
    const sig = req.headers['stripe-signature'];
    const rawBody = req['rawBody'];

    if (!sig || !rawBody) {
      throw new BadRequestException('Missing stripe signature or raw body');
    }

    try {
      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = Number(session.metadata?.userId);
        
        if (!userId) {
          throw new BadRequestException('User ID not found in metadata');
        }

        await this.usersService.activateMembership(userId);
      }

      return { received: true };
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }
  }
}

