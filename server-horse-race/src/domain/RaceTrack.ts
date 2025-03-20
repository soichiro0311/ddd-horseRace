import { randomUUID } from "crypto";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export class RaceTrack {
  private _id;

  constructor(
    private _raceNumber: number,
    private _trackName: string,
    private _purchaseLimitDatetime: Date
  ) {
    this._id = randomUUID();
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

export interface RaceTrackRepositoryInterface {
  findBy(raceTrackName: string): RaceTrack;
}
