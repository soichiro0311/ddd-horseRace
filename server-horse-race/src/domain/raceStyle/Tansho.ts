import { DomainError } from "../error/DomainError";
import { Odds } from "../Odds";
import { Race } from "../Race";
import { RacingTicket } from "../RacingTicket";
import { Refund } from "../Refund";
import { RaceStyle } from "./RaceStyle";

export class Tansho implements RaceStyle {
  validatePredicate(
    race: Race,
    _1stPlaceHorseID?: string,
    _2ndPlaceHorseID?: string,
    _3rdPlaceHorseID?: string
  ): void {
    if (_1stPlaceHorseID == null) {
      throw new DomainError(
        `単勝の場合は1着予想の馬を入力してください。レース番号: ${race.raceNumber()}, 競馬場: ${race.trackName()}`
      );
    }
    if (_2ndPlaceHorseID != null || _3rdPlaceHorseID != null) {
      throw new DomainError(
        `単勝の場合は1着予想の馬のみを入力してください。レース番号: ${race.raceNumber()}, 競馬場: ${race.trackName()}, 1着予想: ${_1stPlaceHorseID}, 2着予想: ${_2ndPlaceHorseID}, 3着予想: ${_3rdPlaceHorseID}`
      );
    }
  }

  refund(ticket: RacingTicket, raceOdds: Odds[]): Refund {
    if (ticket.firstPlaceHorseId() == null) {
      throw new DomainError("");
    }
    const refundAmount = raceOdds
      .find((odds) => {
        return odds.horseId() === ticket.firstPlaceHorseId();
      })!
      .refundAmount();
    return new Refund(refundAmount, ticket.purchaseAmount());
  }
}
