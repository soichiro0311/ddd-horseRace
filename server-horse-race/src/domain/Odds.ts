import { RaceStyle } from "./enum/RaceStyle";

export class Odds {
  constructor(
    private _raceId: string,
    private _raceStyle: RaceStyle,
    private _horseId: string,
    private _refundAmount: number
  ) {}

  horseId() {
    return this._horseId;
  }

  refundAmount() {
    return this._refundAmount;
  }
}
