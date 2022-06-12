import { Authorized, Body, JsonController, Post } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { PaymentService } from './paymentService.mock';
import { WebhookDto } from './dto/webhook.dto';

@Service()
@JsonController('/payments')
export class PaymentsController {
  @Inject()
  private paymentService: PaymentService;

  @Post('/webhook') // this is an update, but the webhooks are usually done with post
  @Authorized() // using auth middleware here
  async webhook(@Body({ validate: true }) body: WebhookDto) {
    await this.paymentService.webhook(body);
    return true;
  }
}
