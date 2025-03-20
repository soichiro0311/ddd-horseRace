import { RaceRepositoryInterface } from "../Race";
import { inject } from "inversify";
import { RacingTicket } from "../RacingTicket";
import { TYPES } from "../../types";

export class PurchaseRacingTicket {
  public constructor(
    @inject(TYPES.RaceRepository)
    private raceRepository: RaceRepositoryInterface
  ) {}
  purchase(raceTrackName: string) {
    const raceTrack = this.raceRepository.findBy(raceTrackName);
    const ticket = new RacingTicket(raceTrack);
    return ticket;
  }
}
