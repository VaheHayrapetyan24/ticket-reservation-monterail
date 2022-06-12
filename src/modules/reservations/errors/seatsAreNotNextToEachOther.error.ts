import {BadRequestError} from "routing-controllers";

export class SeatsAreNotNextToEachOtherError extends BadRequestError {
  constructor() {
    super(`Seats are not next to each other`);
  }
}
