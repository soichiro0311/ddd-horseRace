import { inject } from "inversify";
import { RacingTicketRepositoryInterface } from "../RacingTicket";
import { TYPES } from "../../types";
import { OddsRepositoryInterface } from "../interface/OddsRepository";
import { Refund } from "../Refund";
import { DomainError } from "../error/DomainError";

export class RefundTicket {
  public constructor(
    @inject(TYPES.RacingTicketRepository)
    private racingTicketRepository: RacingTicketRepositoryInterface,
    @inject(TYPES.OddsRepository)
    private oddsRepository: OddsRepositoryInterface
  ) {}

  execute(racingTicketId: string): Refund | undefined {
    const ticket = this.racingTicketRepository.findById(racingTicketId);
    const raceOdds = this.oddsRepository.findBy(
      ticket.raceId(),
      ticket.raceStyle()
    );

    if (raceOdds == null || raceOdds.length === 0) {
      throw new DomainError(
        `対象のレースと様式のオッズが登録されていません。レースID: ${ticket.raceId()}, 様式: ${ticket.raceStyle()}`
      );
    }

    return ticket.raceStyle().refund(ticket, raceOdds);
  }
}
