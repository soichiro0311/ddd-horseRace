import { describe, expect, test, vi } from "vitest";
import { RefundTicket } from "../RefundTicket";
import { myContainer } from "../../../inversifyConfig";
import { RacingTicketRepositoryInterface } from "../../RacingTicket";
import { TYPES } from "../../../types";
import { OddsRepositoryInterface } from "../../interface/OddsRepository";

describe("払い戻しのユースケース", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2025/1/1 14:00:00"));
  const racingTicketRepository =
    myContainer.get<RacingTicketRepositoryInterface>(
      TYPES.RacingTicketRepository
    );
  const oddsRepository = myContainer.get<OddsRepositoryInterface>(
    TYPES.OddsRepository
  );

  test("100円の単勝の馬券が的中している かつ 払い戻し金額が320円の場合、320円が払い戻されること", () => {
    const refundUsecase = new RefundTicket(
      racingTicketRepository,
      oddsRepository
    );
    expect(refundUsecase.execute("RACE1")!.amount()).toBe(320);
  });
});
