import { randomUUID } from "crypto";
import { DomainError } from "../error/DomainError";
import { RacingTicket } from "../RacingTicket";
import { Refund } from "../Refund";
import { Odds } from "./Odds";
import { RaceStyle } from "../raceStyle/RaceStyle";
import { Tansho } from "../raceStyle/Tansho";

export class TanshoOdds implements Odds {
  private _id: string;
  constructor(private _refundAmount: number, private _1stPlaceHorseID: string) {
    this._id = randomUUID();
  }

  refundAmount(): number {
    return this._refundAmount;
  }

  refund(ticket: RacingTicket): Refund {
    if (ticket.firstPlaceHorseId() == null) {
      throw new DomainError("");
    }
    const isRefundable = this._1stPlaceHorseID === ticket.firstPlaceHorseId();

    if (!isRefundable) {
      throw new DomainError(
        `対象の馬券は的中していないため、払い戻しができません。馬券の様式: ${ticket
          .raceStyle()
          .displayName()}, レースID: ${ticket.raceId()}, 競馬場: ${ticket.trackName()}, 1着予想: ${ticket.firstPlaceHorseId()}`
      );
    }
    return new Refund(this.refundAmount(), ticket.purchaseAmount());
  }

  raceStyle(): RaceStyle {
    return new Tansho();
  }
}
