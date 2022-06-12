export class PaymentService {
  static async createInvoice(): Promise<string> {
    // just generate random invoice id
    return Promise.resolve((Math.random() + 1).toString(36).substring(7));
  }
}
