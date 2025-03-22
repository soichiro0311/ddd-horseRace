import { WinningStatus } from "./enum/WinningStatus";
import { DomainError } from "./error/DomainError";
import { Race } from "./Race";
import { randomUUID } from "crypto";
import { RaceStyle } from "./raceStyle/RaceStyle";

export class RacingTicket {
  private _id: string;
  private _winningStatus: WinningStatus;

  constructor(
    private _race: Race,
    private _raceStyle: RaceStyle,
    private _purchaseAmount: number,
    private _1stPlaceHorseID?: string,
    private _2ndPlaceHorseID?: string,
    private _3rdPlaceHorseID?: string
  ) {
    this._id = randomUUID();
    this._winningStatus = WinningStatus.UNDETERMINED;

    const current = new Date();
    if (current > _race.purchaseLimitDatetime()) {
      throw new DomainError(
        `購入対象のレースは購入期限を過ぎております。 レース番号: ${_race.raceNumber()}, 競馬場: ${_race.trackName()}, 購入期限: ${_race.purchaseLimitDatetimeDisplay()}`
      );
    }

    _raceStyle.validatePredicate(
      _race,
      _1stPlaceHorseID,
      _2ndPlaceHorseID,
      _3rdPlaceHorseID
    );
  }

  id() {
    return this._id;
  }

  winningStatus(): WinningStatus {
    return this._winningStatus;
  }

  purchaseAmount() {
    return this._purchaseAmount;
  }

  firstPlaceHorseId() {
    return this._1stPlaceHorseID;
  }

  raceId() {
    return this._race.id();
  }

  raceStyle() {
    return this._raceStyle;
  }
}

export interface RacingTicketRepositoryInterface {
  findById(racingTicketId: string): RacingTicket;
}
