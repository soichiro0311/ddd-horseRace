import { injectable } from "inversify";
import {
  RacingTicket,
  RacingTicketRepositoryInterface,
} from "../domain/RacingTicket";

@injectable()
export class RacingTicketRepository implements RacingTicketRepositoryInterface {
  findById(racingTicketId: string): RacingTicket {
    throw new Error("Method not implemented.");
  }
}
