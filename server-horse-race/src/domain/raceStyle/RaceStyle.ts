import { Race } from "../Race";

export interface RaceStyle {
  validatePredicate(
    race: Race,
    _1stPlaceHorseID?: string,
    _2ndPlaceHorseID?: string,
    _3rdPlaceHorseID?: string
  ): void;

  predicateHorseNumber(): number;

  displayName(): string;

  equals(other: RaceStyle): boolean;
}
