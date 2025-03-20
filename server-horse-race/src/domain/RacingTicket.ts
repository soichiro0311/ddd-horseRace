import { RaceStyle } from "./enum/RaceStyle";
import { WinningStatus } from "./enum/WinningStatus";
import { DomainError } from "./error/DomainError";
import { Race } from "./Race";

export class RacingTicket {
  private _winningStatus: WinningStatus;

  constructor(
    private _race: Race,
    private _raceStyle: RaceStyle,
    private _1stPlaceHorseID?: string,
    private _2ndPlaceHorseID?: string,
    private _3rdPlaceHorseID?: string
  ) {
    this._winningStatus = WinningStatus.UNDETERMINED;
    const current = new Date();
    if (current > _race.purchaseLimitDatetime()) {
      throw new DomainError(
        `購入対象のレースは購入期限を過ぎております。 レース番号: ${_race.raceNumber()}, 競馬場: ${_race.trackName()}, 購入期限: ${_race.purchaseLimitDatetimeDisplay()}`
      );
    }
    this.validatePrediction(
      _raceStyle,
      _1stPlaceHorseID,
      _2ndPlaceHorseID,
      _3rdPlaceHorseID
    );
  }

  winningStatus(): WinningStatus {
    return this._winningStatus;
  }

  validatePrediction(
    raceStyle: RaceStyle,
    _1stPlaceHorseID?: string,
    _2ndPlaceHorseID?: string,
    _3rdPlaceHorseID?: string
  ) {
    switch (raceStyle) {
      case RaceStyle.TANSHO:
        if (_1stPlaceHorseID == null) {
          throw new DomainError(
            `単勝の場合は1着予想の馬を入力してください。レース番号: ${this._race.raceNumber()}, 競馬場: ${this._race.trackName()}`
          );
        }
        if (_2ndPlaceHorseID != null || _3rdPlaceHorseID != null) {
          throw new DomainError(
            `単勝の場合は1着予想の馬のみを入力してください。レース番号: ${this._race.raceNumber()}, 競馬場: ${this._race.trackName()}, 1着予想: ${_1stPlaceHorseID}, 2着予想: ${_2ndPlaceHorseID}, 3着予想: ${_3rdPlaceHorseID}`
          );
        }
        break;
      default:
        throw new DomainError(`様式が想定外です。様式: ${raceStyle}`);
    }
  }
}
