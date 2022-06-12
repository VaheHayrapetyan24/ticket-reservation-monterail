import { Inject, Service } from 'typedi';
import { PaymentStatus, WebhookDto } from './dto/webhook.dto';
import { ReservationsService } from '../../modules/reservations/reservations.service';
import { ReservationStatus } from '../../modules/reservations/reservations.entity';

@Service()
export class PaymentService {
  @Inject(() => ReservationsService)
  private reservationsService: ReservationsService;

  async createInvoice(): Promise<string> {
    // just generate random invoice id
    // would otherwise make a request to the payment service to generate invoice
    return Promise.resolve((Math.random() + 1).toString(36).substring(7));
  }

  async webhook(webhookDto: WebhookDto): Promise<void> {
    switch (webhookDto.paymentStatus) {
      case PaymentStatus.FAILED:
        return this.reservationsService.updateStatus(webhookDto.invoiceId, ReservationStatus.PAYMENT_FAILED);
      case PaymentStatus.SUCCESS:
        return this.reservationsService.updateStatus(webhookDto.invoiceId, ReservationStatus.PAYMENT_SUCCESSFUL);
      case PaymentStatus.PROCESSING:
        // we would cancel the invoice when the 15 min mark is up
        // or set the validity period when creating the invoice
        // right now there is no mechanism to prevent from setting an already invalid reservation to processing
        // which can cause two reservations on the same seat
        return this.reservationsService.updateStatus(webhookDto.invoiceId, ReservationStatus.PAYMENT_PROCESSING);
    }
  }
}
