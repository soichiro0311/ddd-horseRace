import { WinningStatus } from "./enum/WinningStatus";
import { DomainError } from "./error/DomainError";
import { Race } from "./Race";

export class RacingTicket {
  private _winningStatus: WinningStatus;

  constructor(private _race: Race) {
    this._winningStatus = WinningStatus.UNDETERMINED;
    const current = new Date();
    if (current > _race.purchaseLimitDatetime()) {
      throw new DomainError(
        `購入対象のレースは購入期限を過ぎております。 レース番号: ${_race.raceNumber()}, 競馬場: ${_race.trackName()}, 購入期限: ${_race.purchaseLimitDatetimeDisplay()}`
      );
    }
  }

  winningStatus(): WinningStatus {
    return this._winningStatus;
  }
}
