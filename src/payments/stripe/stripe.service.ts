import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-06-30.basil',
    });
  }

  async createCheckoutSession(price: number, userId: number) {
   
    const session = await this.stripe.checkout.sessions.create({
      
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Gym Membership',
            },
            unit_amount: Math.round(price * 100), // Stripe works in cents
          },
          quantity: 1,
        },
      ],
      
      metadata: {
        userId: userId.toString(),
      },
      success_url: `${process.env.FRONTEND_URL}`,
      cancel_url: `${process.env.FRONTEND_URL}`,
    });
  
    return { id: session.id, url: session.url };
  }
}
