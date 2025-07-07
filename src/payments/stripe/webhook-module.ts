// app.module.ts or your specific module
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { RawBodyMiddleware } from './raw-body-middleware.middleware';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[UsersModule],
  controllers: [WebhookController],
})
export class WebhookModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({ path: 'webhooks/webhook', method: RequestMethod.POST });
  }
}
