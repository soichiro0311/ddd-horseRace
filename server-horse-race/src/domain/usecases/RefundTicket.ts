import { inject } from "inversify";
import { RacingTicketRepositoryInterface } from "../RacingTicket";
import { TYPES } from "../../types";
import { RaceResultRepositoryInterface } from "../interface/RaceResultRepository";
import { Refund } from "../Refund";
import { DomainError } from "../error/DomainError";

export class RefundTicket {
  public constructor(
    @inject(TYPES.RacingTicketRepository)
    private racingTicketRepository: RacingTicketRepositoryInterface,
    @inject(TYPES.RaceResultRepository)
    private raceResultRepository: RaceResultRepositoryInterface
  ) {}

  execute(racingTicketId: string): Refund | undefined {
    const ticket = this.racingTicketRepository.findById(racingTicketId);
    const raceResult = this.raceResultRepository.findByRaceId(ticket.raceId());

    if (raceResult == null) {
      throw new DomainError(
        `対象のレースと様式のオッズが登録されていません。レースID: ${ticket.raceId()}, 様式: ${ticket.raceStyle()}`
      );
    }

    return raceResult.refund(ticket);
  }
}
