import { describe, expect, test, vi } from "vitest";
import { PurchaseRacingTicket } from "../PurchaseRacingTicket";
import { RaceRepositoryInterface } from "../../Race";
import { TYPES } from "../../../types";
import { myContainer } from "../../../inversifyConfig";
import { WinningStatus } from "../../enum/WinningStatus";
import { DomainError } from "../../error/DomainError";
import { fail } from "assert";
import { RaceStyle } from "../../enum/RaceStyle";

describe("馬券の購入", () => {
  vi.useFakeTimers();
  const raceRepository = myContainer.get<RaceRepositoryInterface>(
    TYPES.RaceRepository
  );

  test("購入可能な馬券を登録する", () => {
    vi.setSystemTime(new Date("2025/1/1 14:00:00"));
    const purchaseRacingTicketUseCase = new PurchaseRacingTicket(
      raceRepository
    );
    const ticket = purchaseRacingTicketUseCase.purchase(
      "大井競馬場",
      RaceStyle.TANSHO,
      "Horse1"
    );
    expect(ticket.winningStatus()).toEqual(WinningStatus.UNDETERMINED);
  });
  test("購入対象のレースの購入期限が過ぎている場合、購入できないこと", () => {
    vi.setSystemTime(new Date("2025/1/1 14:10:01"));
    const purchaseRacingTicketUseCase = new PurchaseRacingTicket(
      raceRepository
    );
    try {
      purchaseRacingTicketUseCase.purchase(
        "大井競馬場",
        RaceStyle.TANSHO,
        "Horse1"
      );
      fail();
    } catch (e) {
      const error = e as DomainError;
      expect(error.message).toBe(
        "購入対象のレースは購入期限を過ぎております。 レース番号: 1, 競馬場: 大井競馬場, 購入期限: 2025/01/01 14:10"
      );
    }
  });
  describe("単勝の馬券の購入に失敗するケース", () => {
    test("単勝の馬券を購入する際に、2,3着の馬を指定すると購入ができないこと", () => {
      vi.setSystemTime(new Date("2025/1/1 14:10:00"));
      const purchaseRacingTicketUseCase = new PurchaseRacingTicket(
        raceRepository
      );
      try {
        purchaseRacingTicketUseCase.purchase(
          "大井競馬場",
          RaceStyle.TANSHO,
          "Horse1",
          "Horse2",
          "Horse3"
        );
        fail();
      } catch (e) {
        const error = e as DomainError;
        expect(error.message).toBe(
          "単勝の場合は1着予想の馬のみを入力してください。レース番号: 1, 競馬場: 大井競馬場, 1着予想: Horse1, 2着予想: Horse2, 3着予想: Horse3"
        );
      }
    });
    test("単勝の馬券を購入する際に、1着の馬を指定しないと購入ができないこと", () => {
      vi.setSystemTime(new Date("2025/1/1 14:10:00"));
      const purchaseRacingTicketUseCase = new PurchaseRacingTicket(
        raceRepository
      );
      try {
        purchaseRacingTicketUseCase.purchase("大井競馬場", RaceStyle.TANSHO);
        fail();
      } catch (e) {
        const error = e as DomainError;
        expect(error.message).toBe(
          "単勝の場合は1着予想の馬を入力してください。レース番号: 1, 競馬場: 大井競馬場"
        );
      }
    });
  });
});
