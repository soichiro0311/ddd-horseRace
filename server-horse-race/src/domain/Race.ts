import { randomUUID } from "crypto";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export class Race {
  private _id;

  constructor(
    private _raceNumber: number,
    private _trackName: string,
    private _purchaseLimitDatetime: Date
  ) {
    this._id = randomUUID();
  }

  id() {
    return this._id;
  }

  trackName() {
    return this._trackName;
  }

  raceNumber() {
    return this._raceNumber;
  }

  purchaseLimitDatetime() {
    return this._purchaseLimitDatetime;
  }
  purchaseLimitDatetimeDisplay() {
    return format(this._purchaseLimitDatetime, "yyyy/MM/dd HH:mm", {
      locale: ja,
    });
  }
}

export interface RaceRepositoryInterface {
  findBy(raceTrackName: string): Race;
}
