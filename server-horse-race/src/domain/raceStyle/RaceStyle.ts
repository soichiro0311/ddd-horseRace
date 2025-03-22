import { Odds } from "../Odds";
import { Race } from "../Race";
import { RacingTicket } from "../RacingTicket";
import { Refund } from "../Refund";

export interface RaceStyle {
  validatePredicate(
    race: Race,
    _1stPlaceHorseID?: string,
    _2ndPlaceHorseID?: string,
    _3rdPlaceHorseID?: string
  ): void;

  refund(ticket: RacingTicket, raceOdds: Odds[]): Refund;
}
