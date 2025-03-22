import { DomainError } from "../error/DomainError";
import { Odds } from "../Odds";
import { Race } from "../Race";
import { RacingTicket } from "../RacingTicket";
import { Refund } from "../Refund";
import { RaceStyle } from "./RaceStyle";

export class Umaren implements RaceStyle {
  validatePredicate(
    race: Race,
    _1stPlaceHorseID?: string,
    _2ndPlaceHorseID?: string,
    _3rdPlaceHorseID?: string
  ): void {
    const isNotInputedRequiredPrace =
      _1stPlaceHorseID == null || _2ndPlaceHorseID == null;
    const isInputedShouldNotInputPlace = _3rdPlaceHorseID != null;

    if (isNotInputedRequiredPrace || isInputedShouldNotInputPlace) {
      throw new DomainError(
        `馬連の場合は1,2着予想の馬のみを入力してください。レース番号: ${race.raceNumber()}, 競馬場: ${race.trackName()}, 1着予想: ${_1stPlaceHorseID}, 2着予想: ${_2ndPlaceHorseID}, 3着予想: ${_3rdPlaceHorseID}`
      );
    }
  }

  refund(ticket: RacingTicket, raceOdds: Odds[]): Refund {
    throw new Error("Unimpleneted!");
  }
}
