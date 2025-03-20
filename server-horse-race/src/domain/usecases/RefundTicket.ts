import { inject } from "inversify";
import { RacingTicketRepositoryInterface } from "../RacingTicket";
import { TYPES } from "../../types";
import { OddsRepositoryInterface } from "../interface/OddsRepository";
import { Refund } from "../Refund";
import { RaceStyle } from "../enum/RaceStyle";
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

    switch (ticket.raceStyle()) {
      case RaceStyle.TANSHO:
        if (ticket.firstPlaceHorseId() == null) {
          throw new DomainError("");
        }
        const refundAmount = raceOdds
          .find((odds) => {
            return odds.horseId() === ticket.firstPlaceHorseId();
          })!
          .refundAmount();
        return new Refund(refundAmount, ticket.purchaseAmount());
      default:
        throw new DomainError("");
    }
  }
}
