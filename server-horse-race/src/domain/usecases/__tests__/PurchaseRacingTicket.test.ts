import { describe, expect, test, vi } from "vitest";
import { PurchaseRacingTicket } from "../PurchaseRacingTicket";
import { RaceTrackRepositoryInterface } from "../../RaceTrack";
import { TYPES } from "../../../types";
import { myContainer } from "../../../inversifyConfig";
import { WinningStatus } from "../../enum/WinningStatus";
import { DomainError } from "../../error/DomainError";
import { fail } from "assert";

describe("馬券の購入", () => {
  vi.useFakeTimers();
  const raceTrackRepository = myContainer.get<RaceTrackRepositoryInterface>(
    TYPES.RaceTrackRepository
  );

  test("購入可能な馬券を登録する", () => {
    vi.setSystemTime(new Date("2025/1/1 14:00:00"));
    const purchaseRacingTicketUseCase = new PurchaseRacingTicket(
      raceTrackRepository
    );
    const ticket = purchaseRacingTicketUseCase.purchase("大井競馬場");
    expect(ticket.winningStatus()).toEqual(WinningStatus.UNDETERMINED);
  });
  test("購入対象のレースの購入期限が過ぎている場合、購入できないこと", () => {
    vi.setSystemTime(new Date("2025/1/1 14:10:01"));
    const purchaseRacingTicketUseCase = new PurchaseRacingTicket(
      raceTrackRepository
    );
    try {
      purchaseRacingTicketUseCase.purchase("大井競馬場");
      fail();
    } catch (e) {
      const error = e as DomainError;
      expect(error.message).toBe(
        "購入対象のレースは購入期限を過ぎております。 レース番号: 1, 競馬場: 大井競馬場, 購入期限: 2025/01/01 14:10"
      );
    }
  });
});
