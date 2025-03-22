import { injectable } from "inversify";
import {
  RacingTicket,
  RacingTicketRepositoryInterface,
} from "../../domain/RacingTicket";
import { DomainError } from "../../domain/error/DomainError";

@injectable()
export class RacingTicketRepositoryMock
  implements RacingTicketRepositoryInterface
{
  private tickets: { [key: string]: RacingTicket } = {};

  findById(racingTicketId: string): RacingTicket {
    const ticket = this.tickets[racingTicketId];
    if (!ticket) {
      throw new DomainError(
        `RacingTicket not found with id: ${racingTicketId}`
      );
    }
    return ticket;
  }

  setTicket(racingTicketId: string, ticket: RacingTicket) {
    this.tickets[racingTicketId] = ticket;
  }
}
