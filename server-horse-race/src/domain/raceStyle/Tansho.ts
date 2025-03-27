import { DomainError } from "../error/DomainError";
import { Race } from "../Race";
import { RaceStyle } from "./RaceStyle";

export class Tansho implements RaceStyle {
  validatePredicate(
    race: Race,
    _1stPlaceHorseID?: string,
    _2ndPlaceHorseID?: string,
    _3rdPlaceHorseID?: string
  ): void {
    const isNotInputedRequiredPrace = _1stPlaceHorseID == null;
    const isInputedShouldNotInputPlace =
      _2ndPlaceHorseID != null || _3rdPlaceHorseID != null;

    if (isNotInputedRequiredPrace || isInputedShouldNotInputPlace) {
      throw new DomainError(
        `単勝の場合は1着予想の馬のみを入力してください。レース番号: ${race.raceNumber()}, 競馬場: ${race.trackName()}, 1着予想: ${_1stPlaceHorseID}, 2着予想: ${_2ndPlaceHorseID}, 3着予想: ${_3rdPlaceHorseID}`
      );
    }
  }

  predicateHorseNumber(): number {
    return 1;
  }

  displayName(): string {
    return "単勝";
  }

  equals(other: RaceStyle): boolean {
    return this.displayName() === other.displayName();
  }
}
