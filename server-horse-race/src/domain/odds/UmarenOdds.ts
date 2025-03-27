import { randomUUID } from "crypto";
import { DomainError } from "../error/DomainError";
import { RacingTicket } from "../RacingTicket";
import { Refund } from "../Refund";
import { Odds } from "./Odds";
import { RaceStyle } from "../raceStyle/RaceStyle";
import { Tansho } from "../raceStyle/Tansho";
import { Umaren } from "../raceStyle/Umaren";

export class UmarenOdds implements Odds {
  private _id: string;
  private _isRefundableHorses: string[];

  constructor(
    private _refundAmount: number,
    private _1stPlaceHorseID: string,
    private _2ndPlaceHorseID: string
  ) {
    this._id = randomUUID();
    this._isRefundableHorses = [_1stPlaceHorseID, _2ndPlaceHorseID];
  }

  refundAmount(): number {
    return this._refundAmount;
  }

  refund(ticket: RacingTicket): Refund {
    if (
      ticket.firstPlaceHorseId() == null ||
      ticket.secondPlaceHorseId() == null
    ) {
      throw new DomainError("");
    }
    const isRefundable =
      this._isRefundableHorses.includes(ticket.firstPlaceHorseId()!) &&
      this._isRefundableHorses.includes(ticket.secondPlaceHorseId()!);

    if (!isRefundable) {
      throw new DomainError(
        `対象の馬券は的中していないため、払い戻しができません。馬券の様式: ${ticket
          .raceStyle()
          .displayName()}, レースID: ${ticket.raceId()}, 競馬場: ${ticket.trackName()}, 1着予想: ${ticket.firstPlaceHorseId()}, 2着予想: ${ticket.secondPlaceHorseId()}`
      );
    }
    return new Refund(this.refundAmount(), ticket.purchaseAmount());
  }

  raceStyle(): RaceStyle {
    return new Umaren();
  }
}
