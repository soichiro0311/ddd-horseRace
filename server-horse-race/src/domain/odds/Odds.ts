import { RaceStyle } from "../raceStyle/RaceStyle";
import { RacingTicket } from "../RacingTicket";
import { Refund } from "../Refund";

export interface Odds {
  refund(ticket: RacingTicket): Refund;
  refundAmount(): number;
  raceStyle(): RaceStyle;
}
