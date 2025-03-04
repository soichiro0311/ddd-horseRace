import { describe, test } from "vitest";
import { PurchaseRacingTicket } from "../PurchaseRacingTicket";
import { RaceTrackRepositoryInterface } from "../../RaceTrack";
import { TYPES } from "../../../types";
import { myContainer } from "../../../inversifyConfig";

describe("馬券の購入", () => {
  test("購入可能な馬券を登録する", () => {
    const raceTrackRepository = myContainer.get<RaceTrackRepositoryInterface>(
      TYPES.RaceTrackRepository
    );
    const purchaseRacingTicketUseCase = new PurchaseRacingTicket(
      raceTrackRepository
    );
    purchaseRacingTicketUseCase.purchase("大井競馬場");
  });
});
