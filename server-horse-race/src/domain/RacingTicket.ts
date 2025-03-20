import { WinningStatus } from "./enum/WinningStatus";
import { DomainError } from "./error/DomainError";
import { RaceTrack } from "./RaceTrack";

export class RacingTicket {
  private _winningStatus: WinningStatus;

  constructor(private _raceTrack: RaceTrack) {
    this._winningStatus = WinningStatus.UNDETERMINED;
    const current = new Date();
    if (current > _raceTrack.purchaseLimitDatetime()) {
      throw new DomainError(
        `購入対象のレースは購入期限を過ぎております。 レース番号: ${_raceTrack.raceNumber()}, 競馬場: ${_raceTrack.trackName()}, 購入期限: ${_raceTrack.purchaseLimitDatetimeDisplay()}`
      );
    }
  }

  winningStatus(): WinningStatus {
    return this._winningStatus;
  }
}
