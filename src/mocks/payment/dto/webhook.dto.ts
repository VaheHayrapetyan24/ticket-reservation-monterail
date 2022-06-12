import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum PaymentStatus {
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export class WebhookDto {
  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  paymentStatus: PaymentStatus;
}
