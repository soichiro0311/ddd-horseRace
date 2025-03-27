import { RacingTicket } from "./RacingTicket";
import { Odds } from "./odds/Odds";
import { Refund } from "./Refund";

export class RaceResult {
  constructor(
    private _raceId: string,
    private odds: Odds[],
    private _1stPlaceHorseID: string,
    private _2ndPlaceHorseID?: string,
    private _3rdPlaceHorseID?: string
  ) {}

  raceId() {
    return this._raceId;
  }

  refund(ticket: RacingTicket): Refund | undefined {
    return this.odds
      .find((odd) => odd.raceStyle().equals(ticket.raceStyle()))
      ?.refund(ticket);
  }
}
