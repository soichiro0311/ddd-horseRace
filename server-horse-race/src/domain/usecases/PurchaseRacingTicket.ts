import { RaceRepositoryInterface } from "../Race";
import { inject } from "inversify";
import { RacingTicket } from "../RacingTicket";
import { TYPES } from "../../types";
import { RaceStyle } from "../enum/RaceStyle";

export class PurchaseRacingTicket {
  public constructor(
    @inject(TYPES.RaceRepository)
    private raceRepository: RaceRepositoryInterface
  ) {}
  purchase(
    raceTrackName: string,
    raceStyle: RaceStyle,
    purchaseAmount: number,
    _1stPlaceHorseID?: string,
    _2ndPlaceHorseID?: string,
    _3rdPlaceHorseID?: string
  ) {
    const raceTrack = this.raceRepository.findBy(raceTrackName);
    const ticket = new RacingTicket(
      raceTrack,
      raceStyle,
      purchaseAmount,
      _1stPlaceHorseID,
      _2ndPlaceHorseID,
      _3rdPlaceHorseID
    );
    return ticket;
  }
}
