import { RaceTrackRepositoryInterface } from "../RaceTrack";
import { inject } from "inversify";
import { RacingTicket } from "../RacingTicket";
import { TYPES } from "../../types";

export class PurchaseRacingTicket {
  public constructor(
    @inject(TYPES.RaceTrackRepository)
    private raceTrackRepository: RaceTrackRepositoryInterface
  ) {}
  purchase(raceTrackName: string) {
    const raceTrack = this.raceTrackRepository.findBy(raceTrackName);
    const ticket = new RacingTicket(raceTrack);
    return ticket;
  }
}
